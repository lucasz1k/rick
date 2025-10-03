-- Remove the insecure public view policy
DROP POLICY IF EXISTS "Anyone can view contacts" ON public.contacts;

-- Create secure RLS policies for contacts table
-- Only authenticated users can view contacts (admin/staff access)
CREATE POLICY "Authenticated users can view contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (true);

-- Only authenticated users can update contact status
CREATE POLICY "Authenticated users can update contacts" 
ON public.contacts 
FOR UPDATE 
TO authenticated
USING (true);

-- Only authenticated users can delete contacts if needed
CREATE POLICY "Authenticated users can delete contacts" 
ON public.contacts 
FOR DELETE 
TO authenticated
USING (true);

-- Keep the public insert policy so contact forms still work
-- (This policy already exists: "Anyone can create contacts")