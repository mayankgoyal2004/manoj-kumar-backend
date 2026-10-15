import { z } from 'zod';

// Pagination and Filtering Query Schema
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().max(500).optional().default(20),
  search: z.string().optional(),
  status: z.string().optional(),
  category: z.string().optional(),
  indexing: z.string().optional(),
  album: z.string().optional(),
  folder: z.string().optional(),
  role: z.string().optional(),
  kind: z.string().optional(),
  sort: z.string().optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Helper for numeric inputs that may be empty strings "" or numbers
const optionalInt = z.preprocess((val) => {
  if (val === '' || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? val : num;
}, z.number().int().optional().nullable());

const optionalFloat = z.preprocess((val) => {
  if (val === '' || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? val : num;
}, z.number().optional().nullable());

// Positions
export const positionSchema = z.object({
  role: z.string().min(1, 'Role / Designation is required'),
  organisation: z.string().min(1, 'Organisation is required'),
  location: z.string().optional().nullable(),
  startYear: optionalInt,
  start_year: optionalInt,
  endYear: optionalInt,
  end_year: optionalInt,
  status: z.enum(['Current', 'Completed']).optional().default('Current'),
  description: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Education
export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  specialization: z.string().optional().nullable(),
  category: z.enum(['Academic Degree', 'Executive Certification']).optional().default('Academic Degree'),
  year: optionalInt,
  grade: z.string().optional().nullable(),
  status: z.enum(['Verified', 'Pending']).optional().default('Verified'),
  notes: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Awards
export const awardSchema = z.object({
  title: z.string().min(1, 'Award title is required'),
  organisation: z.string().optional().nullable(),
  category: z.enum(['Personal', 'Institutional', 'Government', 'National', 'International', 'Professional Body']).optional().default('Personal'),
  year: optionalInt,
  status: z.enum(['Awarded', 'Nominated']).optional().default('Awarded'),
  citation: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Patents
export const patentSchema = z.object({
  title: z.string().min(1, 'Patent title is required'),
  patentNumber: z.string().optional().nullable(),
  patent_number: z.string().optional().nullable(),
  domain: z.string().optional().nullable(),
  country: z.string().optional().default('India'),
  filingDate: z.string().optional().nullable(),
  filing_date: z.string().optional().nullable(),
  grantDate: z.string().optional().nullable(),
  grant_date: z.string().optional().nullable(),
  inventors: z.string().optional().nullable(),
  status: z.enum(['Granted', 'Published', 'Filed', 'Expired']).optional().default('Published'),
  abstract: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Publications
export const publicationSchema = z.object({
  title: z.string().min(1, 'Publication title is required'),
  journal: z.string().optional().nullable(),
  venue: z.string().optional().nullable(),
  authors: z.string().optional().nullable(),
  year: optionalInt,
  citations: z.coerce.number().int().optional().default(0),
  doi: z.string().optional().nullable(),
  indexing: z.enum(['SCI', 'Scopus', 'UGC-CARE', 'Web of Science', 'Conference', 'Other']).optional().default('SCI'),
  status: z.enum(['Published', 'In Press', 'Under Review', 'Draft']).optional().default('Published'),
  abstract: z.string().optional().nullable(),
  publicationType: z.string().optional().default('Journal'),
  url: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Books
export const bookSchema = z.object({
  title: z.string().min(1, 'Book title is required'),
  publisher: z.string().optional().nullable(),
  kind: z.enum(['Authored Book', 'Edited Volume', 'Chapter', 'Monograph']).optional().default('Authored Book'),
  isbn: z.string().optional().nullable(),
  year: optionalInt,
  coAuthors: z.string().optional().nullable(),
  co_authors: z.string().optional().nullable(),
  status: z.enum(['Published', 'In Press', 'Draft']).optional().default('Published'),
  abstract: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Grants
export const grantSchema = z.object({
  project: z.string().min(1, 'Project title is required'),
  agency: z.string().optional().nullable(),
  amount: optionalFloat,
  startYear: optionalInt,
  start_year: optionalInt,
  endYear: optionalInt,
  end_year: optionalInt,
  role: z.enum(['Principal Investigator', 'Co-Investigator', 'Mentor']).optional().default('Principal Investigator'),
  status: z.enum(['Active', 'Sanctioned', 'Completed']).optional().default('Active'),
  outcomes: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Supervision
export const supervisionSchema = z.object({
  scholar: z.string().min(1, 'Scholar name is required'),
  thesis: z.string().optional().nullable(),
  program: z.enum(['PhD', 'M.Tech', 'M.Phil', 'Post-Doctoral']).optional().default('PhD'),
  enrolledYear: optionalInt,
  enrolled_year: optionalInt,
  coSupervisor: z.string().optional().nullable(),
  co_supervisor: z.string().optional().nullable(),
  status: z.enum(['Ongoing', 'Awarded', 'Submitted']).optional().default('Ongoing'),
  progress: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Conferences
export const conferenceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  event: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  role: z.string().optional().default('Keynote'),
  category: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
  status: z.enum(['Delivered', 'Scheduled']).optional().default('Delivered'),
  summary: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Affiliations
export const affiliationSchema = z.object({
  body: z.string().min(1, 'Body / Council name is required'),
  position: z.string().optional().nullable(),
  kind: z.string().optional().default('Fellowship'),
  category: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
  since: optionalInt,
  status: z.enum(['Current', 'Completed']).optional().default('Current'),
  notes: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// MoUs
export const mouSchema = z.object({
  partner: z.string().min(1, 'Partner organisation is required'),
  country: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
  signedDate: z.string().optional().nullable(),
  signed_date: z.string().optional().nullable(),
  validity: z.string().optional().nullable(),
  status: z.enum(['Active', 'Signed', 'Expired']).optional().default('Active'),
  notes: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// News
export const newsSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  outlet: z.string().optional().nullable(),
  category: z.string().optional().default('Press Release'),
  date: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.enum(['Published', 'Draft', 'Archived']).optional().default('Published'),
  summary: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Gallery
export const gallerySchema = z.object({
  caption: z.string().min(1, 'Caption is required'),
  album: z.string().optional().default('Campus'),
  image: z.string().optional().nullable(),
  mediaType: z.string().optional().default('Image'),
  videoUrl: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  credit: z.string().optional().nullable(),
  status: z.enum(['Published', 'Draft']).optional().default('Published'),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Media Library
export const mediaSchema = z.object({
  name: z.string().min(1, 'Asset name is required'),
  kind: z.enum(['Image', 'Video', 'Document', 'Logo']).optional().default('Image'),
  folder: z.enum(['Brand', 'Campus', 'Events', 'Publications', 'Press Kit']).optional().default('Brand'),
  image: z.string().min(1, 'Asset URL is required'),
  size: z.string().optional().nullable(),
  status: z.enum(['Published', 'Draft']).optional().default('Published'),
});

// Documents
export const documentSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  category: z.string().optional().default('Curriculum Vitae'),
  fileType: z.string().optional().default('PDF'),
  size: z.string().optional().nullable(),
  fileUrl: z.string().optional().nullable(),
  visibility: z.string().optional().default('Public'),
  status: z.string().optional().default('Published'),
  notes: z.string().optional().nullable(),
  orderIndex: z.coerce.number().int().optional().default(0),
});

// Users
export const userSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6).optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CONTRIBUTOR', 'VIEWER']).optional().default('ADMIN'),
  department: z.string().optional().nullable(),
  status: z.enum(['Active', 'Invited', 'Suspended']).optional().default('Active'),
});

// Notifications
export const notificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  kind: z.enum(['System', 'Review', 'Publishing', 'Security']).optional().default('System'),
  message: z.string().min(1, 'Message is required'),
  status: z.enum(['Unread', 'Read']).optional().default('Unread'),
  link: z.string().optional().nullable(),
});

// Contact Inquiries (Website Submission)
export const contactMessageSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  organization: z.string().optional().nullable(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().nullable(),
  purpose: z.string().optional().default('Academic Collaboration'),
  message: z.string().min(5, 'Message must be at least 5 characters long'),
});

// Website Settings
export const websiteSettingSchema = z.object({
  siteTitle: z.string().min(1).optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  favicon: z.string().optional().nullable(),
  contactEmail: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  footer: z.string().optional(),
  linkedin: z.string().optional().nullable(),
  x: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  sections: z.record(z.any()).optional(),
});
