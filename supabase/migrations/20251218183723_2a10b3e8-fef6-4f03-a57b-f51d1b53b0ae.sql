-- 1. Create discount type enum
CREATE TYPE public.discount_type AS ENUM ('percentage', 'fixed');

-- 2. Create coupons table
CREATE TABLE public.coupons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text UNIQUE NOT NULL,
    discount_type discount_type NOT NULL,
    discount_value numeric NOT NULL,
    min_purchase numeric DEFAULT 0,
    max_uses integer,
    used_count integer DEFAULT 0,
    expires_at timestamp with time zone,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 3. Enable RLS on coupons
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- 4. Public can read active coupons (for validation)
CREATE POLICY "Anyone can read active coupons"
ON public.coupons
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- 5. Only admins can manage coupons
CREATE POLICY "Admins can manage coupons"
ON public.coupons
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Insert launch coupons for March 2025
INSERT INTO public.coupons (code, discount_type, discount_value, min_purchase, max_uses, expires_at) VALUES
('INAUGURA10', 'percentage', 10, 0, 100, '2025-04-30 23:59:59-03'),
('INAUGURA15', 'percentage', 15, 50, 50, '2025-04-30 23:59:59-03'),
('INAUGURA20', 'percentage', 20, 100, 30, '2025-03-31 23:59:59-03'),
('PRIMEIRACOMPRA', 'percentage', 15, 0, NULL, '2025-12-31 23:59:59-03'),
('FRETEGRATIS', 'fixed', 20, 80, 50, '2025-04-30 23:59:59-03');