-- Mock-equivalent seed records. Safe to apply after the initial schema.

insert into public.agencies (id, name, verification_status, legal_contact_email) values
  ('10000000-0000-0000-0000-000000000001', 'Aster Rights Studio', 'verified', 'legal@aster.example'),
  ('10000000-0000-0000-0000-000000000002', 'Northline Management', 'verified', 'legal@northline.example');

insert into public.talents (id, agency_id, display_name, category, territory, reputation_score) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Mina Park', 'Actor', 'KR, JP, US', 94),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Daniel Kwon', 'Actor', 'Global excluding CN', 91);

insert into public.talent_policies (id, talent_id, version, allowed_uses, restricted_uses, likeness_boundaries, required_disclosures, review_sla_hours, minimum_license_fee) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 1, array['Brand film','Short-form social','Episodic concept proof'], array['Political endorsement','Medical claims','Adult content'], array['No voice cloning without separate approval','No age regression below 21','No implied personal product use'], array['Official AI appearance mark','Certificate URL in final credits'], 36, 18000),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 1, array['Game trailer','Virtual host','Previsualization'], array['Financial advice','Gambling','Deepfake parody'], array['Wardrobe must match approved style guide','No unscripted dialogue beyond submitted script'], array['Visible AI appearance badge','Landing page certificate link'], 48, 24000);
