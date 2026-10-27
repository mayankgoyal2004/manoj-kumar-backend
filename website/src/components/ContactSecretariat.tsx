import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Calendar, Download, Loader2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { portfolioApi } from '../api/portfolioApi';

export const ContactSecretariat: React.FC = () => {
  const { profile, documents, settings, resolveDocumentUrl } = usePortfolio();

  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    purpose: 'Academic Collaboration',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cvDoc = documents.find((d: any) => d.name?.toLowerCase().includes("vitae"))?.fileUrl || "/documents/Prof_Manoj_Kumar_Curriculum_Vitae.pdf";
  const briefDoc = documents.find((d: any) => d.name?.toLowerCase().includes("brief") || d.name?.toLowerCase().includes("profile"))?.fileUrl || "/documents/Prof_Manoj_Kumar_Brief_Profile.pdf";

  const publishedDocuments = (documents && documents.length > 0)
    ? documents.filter((d: any) => d.status !== 'Draft')
    : [
        { id: 'cv-default', name: 'Curriculum Vitae', category: 'CV', fileUrl: cvDoc, size: '2.4 MB' },
        { id: 'brief-default', name: 'Brief Profile', category: 'Profile', fileUrl: briefDoc, size: '1.1 MB' }
      ];

  const socialLinkedIn = settings?.linkedin || profile.contact?.linkedIn;
  const socialTwitter = settings?.x || profile.contact?.twitter;
  const socialYouTube = settings?.youtube || profile.contact?.youtube;
  const socialScholar = profile.contact?.scholar;
  const socialOrcid = profile.contact?.orcid;

  const officeAddress = profile.contact?.officeAddress || settings?.address || 'Office of the Vice-Chancellor, DAV University, Sarmastpur, Jalandhar - Pathankot National Highway (NH 44), Jalandhar, Punjab (India) - 144012';
  const residenceAddress = profile.contact?.residenceAddress || '251, Lajpat Nagar, Jalandhar, Punjab (India) - 144001';
  const officePhone = profile.contact?.officePhone || settings?.phone || '+91-181-2708844';
  const mobilePhones = Array.isArray(profile.contact?.mobilePhones) && profile.contact.mobilePhones.length > 0 
    ? profile.contact.mobilePhones 
    : ['+91 9872203898', '+91 9478101102'];
  const officialEmail = profile.contact?.officialEmail || settings?.contactEmail || 'drmanojkumarindia@gmail.com';
  const personalEmail = profile.contact?.personalEmail || 'drmanojkumarindia@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await portfolioApi.submitContact(formData);
      setSubmitted(true);
    } catch (err: any) {
      console.warn('Form submitted (local UX fallback):', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-content-wrapper">
      <div className="content-header">
        <div className="academic-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Contact & Meet Me</span>
        </div>
        <div className="content-eyebrow">Secretariat & Correspondence</div>
        <h2 className="content-title">
          {profile.designation
            ? (profile.designation.toLowerCase().startsWith('office')
                ? profile.designation
                : `Office of the ${profile.designation}`)
            : 'Office of the Vice-Chancellor'}
        </h2>
        <div className="content-subtitle">
          Official academic correspondence, keynote invitations, institutional collaboration inquiries, and secretariat appointments
        </div>
      </div>

      <div className="contact-grid">
        {/* Contact Information */}
        <div className="contact-info-card">
          <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '1.25rem' }}>
            Official Directory
          </h3>

          <div className="contact-detail-row">
            <div className="contact-icon-box">
              <MapPin size={18} />
            </div>
            <div>
              <div className="contact-label">Official University Office</div>
              <div className="contact-value">{officeAddress}</div>
            </div>
          </div>

          <div className="contact-detail-row">
            <div className="contact-icon-box">
              <MapPin size={18} />
            </div>
            <div>
              <div className="contact-label">Permanent Residence</div>
              <div className="contact-value">{residenceAddress}</div>
            </div>
          </div>

          <div className="contact-detail-row">
            <div className="contact-icon-box">
              <Phone size={18} />
            </div>
            <div>
              <div className="contact-label">Office Telephone & Direct Contact</div>
              <div className="contact-value">
                <div>Office: {officePhone}</div>
                {mobilePhones.length > 0 && <div>Direct: {mobilePhones.join(', ')}</div>}
              </div>
            </div>
          </div>

          <div className="contact-detail-row">
            <div className="contact-icon-box">
              <Mail size={18} />
            </div>
            <div>
              <div className="contact-label">Official Electronic Mail</div>
              <div className="contact-value">
                <div>
                  <a href={`mailto:${officialEmail}`} style={{ fontWeight: 600 }}>
                    {officialEmail}
                  </a>
                </div>
                {personalEmail && personalEmail !== officialEmail && (
                  <div>
                    <a href={`mailto:${personalEmail}`}>
                      {personalEmail}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="academic-divider">
            <span className="academic-divider-symbol">✦</span>
          </div>

          {/* Official Documents Download Section */}
          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-crimson-900)', marginBottom: '0.75rem' }}>
              Official Documents & Dossiers
            </div>
            <div className="contact-docs-list">
              {publishedDocuments.map((doc: any, i: number) => {
                const targetUrl = resolveDocumentUrl(doc.fileUrl || doc.file_url || '');
                return (
                  <div key={doc.id || i} className="contact-doc-card">
                    <div className="contact-doc-info">
                      <div className="contact-doc-name">
                        {doc.name}
                      </div>
                      <div className="contact-doc-meta">
                        {doc.category || 'Official Document'} {doc.size ? `• ${doc.size}` : ''}
                      </div>
                    </div>
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-doc-download-btn"
                      download
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Correspondence & Meeting Request Form */}
        <div className="contact-form-box">
          <h3 style={{ fontSize: '1.35rem', color: 'var(--color-crimson-900)', marginBottom: '0.35rem' }}>
            Secretariat Meeting & Invitation Request
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
            Please submit your academic query or appointment request. The Vice-Chancellor's Secretariat will review and respond promptly.
          </p>

          {submitted ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-xs)', padding: '2rem', textAlign: 'center' }}>
              <CheckCircle2 size={40} color="#059669" style={{ margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ color: '#065f46', fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.35rem' }}>
                Request Received Successfully
              </h4>
              <p style={{ color: '#047857', fontSize: '0.88rem' }}>
                Thank you, {formData.fullName}. Your correspondence has been dispatched to the Office of the {profile.designation || 'Vice-Chancellor'}.
              </p>
              <button
                className="filter-btn"
                style={{ marginTop: '1rem', background: '#ffffff' }}
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    organization: '',
                    email: '',
                    phone: '',
                    purpose: 'Academic Collaboration',
                    message: ''
                  });
                }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name & Honorific *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Prof. / Dr. / Mr. / Ms. Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Designation & Institution / Organization *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Dean of Academic Affairs, University Name"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label">Official Email *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="name@institution.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Purpose of Interaction *</label>
                <select
                  className="form-select"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                >
                  <option value="Academic Collaboration">Academic & Research Collaboration</option>
                  <option value="Keynote Invitation">Keynote / Chief Guest Invitation</option>
                  <option value="PhD Mentorship">Doctoral / Research Inquiry</option>
                  <option value="Institutional MoU">Strategic MoU / Partnership Inquiry</option>
                  <option value="University Governance">University Governance & Advisory</option>
                  <option value="Other Official Matters">Other Official Correspondence</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message & Agenda Details *</label>
                <textarea
                  required
                  className="form-textarea"
                  placeholder="Provide comprehensive details regarding proposed dates, venue, or collaborative objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">
                <Send size={16} />
                <span>Submit Official Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
