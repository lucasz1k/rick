-- Add unique constraint to contact_rate_limits table for IP address
-- This is needed for the ON CONFLICT functionality in the rate limiting function
ALTER TABLE public.contact_rate_limits 
ADD CONSTRAINT contact_rate_limits_ip_address_unique UNIQUE (ip_address);