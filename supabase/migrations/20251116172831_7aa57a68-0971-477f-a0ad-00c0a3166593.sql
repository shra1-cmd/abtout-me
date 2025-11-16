-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('project-images', 'project-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('skill-icons', 'skill-icons', true, 1048576, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']);

-- Storage policies for project images
CREATE POLICY "Anyone can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Anyone can update project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images');

-- Storage policies for skill icons
CREATE POLICY "Anyone can view skill icons"
ON storage.objects FOR SELECT
USING (bucket_id = 'skill-icons');

CREATE POLICY "Anyone can upload skill icons"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'skill-icons');

CREATE POLICY "Anyone can update skill icons"
ON storage.objects FOR UPDATE
USING (bucket_id = 'skill-icons');

CREATE POLICY "Anyone can delete skill icons"
ON storage.objects FOR DELETE
USING (bucket_id = 'skill-icons');

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  icon_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for skills
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Skills policies
CREATE POLICY "Anyone can view skills"
ON public.skills FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert skills"
ON public.skills FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update skills"
ON public.skills FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete skills"
ON public.skills FOR DELETE
USING (true);

-- Add trigger for skills updated_at
CREATE TRIGGER update_skills_updated_at
BEFORE UPDATE ON public.skills
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create about_info table for personal information
CREATE TABLE public.about_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  type TEXT DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for about_info
ALTER TABLE public.about_info ENABLE ROW LEVEL SECURITY;

-- About info policies
CREATE POLICY "Anyone can view about info"
ON public.about_info FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert about info"
ON public.about_info FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update about info"
ON public.about_info FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete about info"
ON public.about_info FOR DELETE
USING (true);

-- Add trigger for about_info updated_at
CREATE TRIGGER update_about_info_updated_at
BEFORE UPDATE ON public.about_info
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();