import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { 
  isValidUrl, 
  isValidEmail, 
  isValidSalary, 
  isValidDate,
  validateField 
} from '../utils/validation';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Select, 
  FormErrorMessage, 
  FormHelperText,
  VStack,
  Heading,
  useToast,
  Tooltip,
  InputGroup,
  InputLeftAddon,
  HStack,
  Card,
  CardBody
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const initialFormState = {
  company: '',
  position: '',
  status: 'Applied',
  date_applied: new Date().toISOString().split('T')[0],
  salary: '',
  location: '',
  job_description: '',
  company_website: '',
  contact_email: '',
  notes: ''
};

export default function JobForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const statusOptions = [
    'Applied', 
    'Interview Scheduled', 
    'Interview Completed', 
    'Offer Received', 
    'Rejected', 
    'Accepted', 
    'Declined'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field when the user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Company validation
    newErrors.company = validateField(
      formData.company,
      'Company name',
      (value) => value.length >= 2,
      'Company name must be at least 2 characters'
    );
    
    // Position validation
    newErrors.position = validateField(
      formData.position,
      'Position',
      (value) => value.length >= 2,
      'Position must be at least 2 characters'
    );
    
    // Date validation
    newErrors.date_applied = validateField(
      formData.date_applied,
      'Application date',
      isValidDate,
      'Please enter a valid date in YYYY-MM-DD format'
    );
    
    // Salary validation (optional)
    if (formData.salary) {
      newErrors.salary = validateField(
        formData.salary,
        'Salary',
        isValidSalary,
        'Enter a valid salary (number or range like 50000-70000)'
      );
    }
    
    // Website validation (optional)
    if (formData.company_website) {
      newErrors.company_website = validateField(
        formData.company_website,
        'Company website',
        isValidUrl,
        'Please enter a valid URL (including http:// or https://)'
      );
    }
    
    // Email validation (optional)
    if (formData.contact_email) {
      newErrors.contact_email = validateField(
        formData.contact_email,
        'Contact email',
        isValidEmail,
        'Please enter a valid email address'
      );
    }
    
    // Filter out null errors
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== null)
    );
    
    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Form validation failed',
        description: 'Please check the form for errors.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([formData]);
        
      if (error) throw error;
      
      toast({
        title: 'Job added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset the form after successful submission
      setFormData(initialFormState);
    } catch (error) {
      toast({
        title: 'Error adding job',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const FieldTooltip = ({ label, tooltip }) => (
    <HStack spacing={1}>
      <FormLabel mb={0}>{label}</FormLabel>
      <Tooltip label={tooltip} placement="top" hasArrow>
        <InfoIcon boxSize={3} color="gray.500" />
      </Tooltip>
    </HStack>
  );

  return (
    <Card variant="outline" mx="auto" maxW="800px" my={8}>
      <CardBody>
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={5} align="stretch">
            <Heading size="lg" textAlign="center">Add New Job Application</Heading>
            
            {/* Company Name */}
            <FormControl isRequired isInvalid={errors.company}>
              <FieldTooltip 
                label="Company Name" 
                tooltip="Enter the full legal name of the company"
              />
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Acme Corporation"
              />
              <FormErrorMessage>{errors.company}</FormErrorMessage>
            </FormControl>
            
            {/* Position */}
            <FormControl isRequired isInvalid={errors.position}>
              <FieldTooltip 
                label="Position" 
                tooltip="Enter the exact job title as listed in the job posting"
              />
              <Input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
              />
              <FormErrorMessage>{errors.position}</FormErrorMessage>
            </FormControl>
            
            {/* Status */}
            <FormControl isRequired>
              <FieldTooltip 
                label="Application Status" 
                tooltip="Select the current status of your application"
              />
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            </FormControl>
            
            {/* Application Date */}
            <FormControl isRequired isInvalid={errors.date_applied}>
              <FieldTooltip 
                label="Date Applied" 
                tooltip="The date when you submitted your application"
              />
              <Input
                name="date_applied"
                type="date"
                value={formData.date_applied}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.date_applied}</FormErrorMessage>
            </FormControl>
            
            {/* Salary */}
            <FormControl isInvalid={errors.salary}>
              <FieldTooltip 
                label="Salary" 
                tooltip="Enter either a specific amount or a range (e.g., 50000-70000)"
              />
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 70000 or 60000-80000"
                />
              </InputGroup>
              <FormHelperText>Enter either a specific amount or a range</FormHelperText>
              <FormErrorMessage>{errors.salary}</FormErrorMessage>
            </FormControl>
            
            {/* Location */}
            <FormControl>
              <FieldTooltip 
                label="Location" 
                tooltip="Enter the job location or 'Remote' if applicable"
              />
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York, NY or Remote"
              />
            </FormControl>
            
            {/* Job Description */}
            <FormControl>
              <FieldTooltip 
                label="Job Description" 
                tooltip="Paste the key responsibilities and requirements from the job posting"
              />
              <Textarea
                name="job_description"
                value={formData.job_description}
                onChange={handleChange}
                placeholder="Enter or paste the job description here"
                size="md"
                rows={5}
              />
            </FormControl>
            
            {/* Company Website */}
            <FormControl isInvalid={errors.company_website}>
              <FieldTooltip 
                label="Company Website" 
                tooltip="Include the full URL starting with http:// or https://"
              />
              <Input
                name="company_website"
                value={formData.company_website}
                onChange={handleChange}
                placeholder="e.g. https://www.company.com"
              />
              <FormErrorMessage>{errors.company_website}</FormErrorMessage>
            </FormControl>
            
            {/* Contact Email */}
            <FormControl isInvalid={errors.contact_email}>
              <FieldTooltip 
                label="Contact Email" 
                tooltip="Email address of the recruiter or hiring manager"
              />
              <Input
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="e.g. recruiter@company.com"
              />
              <FormErrorMessage>{errors.contact_email}</FormErrorMessage>
            </FormControl>
            
            {/* Notes */}
            <FormControl>
              <FieldTooltip 
                label="Notes" 
                tooltip="Any additional information about this application"
              />
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes about the application, interviews, etc."
                size="md"
                rows={3}
              />
            </FormControl>
            
            {/* Submit Button */}
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={isLoading}
              type="submit"
              size="lg"
              width="full"
            >
              Add Job Application
            </Button>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
}
