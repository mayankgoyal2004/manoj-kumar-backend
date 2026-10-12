import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Calendar, Download } from 'lucide-react';
import { executiveProfile } from '../data/profileData';

export const ContactSecretariat: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    purpose: 'Academic Collaboration',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
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
        <h2 className="content-title">Office of the Vice-Chancellor</h2>
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
              <div className="contact-value">{executiveProfile.contact.officeAddress}</div>
            </div>
          </div>

          <div className="contact-detail-row">
            <div className="contact-icon-box">
              <MapPin size={18} />
            </div>
            <div>
              <div className="contact-label">Permanent Residence</div>
              <div className="contact-value">{executiveProfile.contact.residenceAddress}</div>
            </div>
          </div>

          <div className="contact-detail-row">
            <div className="contact-icon-box">
              <Phone size={18} />
            </div>
            <div>
              <div className="contact-label">Office Telephone & Direct Contact</div>
              <div className="contact-value">
                <div>Office: {executiveProfile.contact.officePhone}</div>
                <div>Direct: {executiveProfile.contact.mobilePhones.join(', ')}</div>
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
                  <a href={`mailto:${executiveProfile.contact.officialEmail}`} style={{ fontWeight: 600 }}>
                    {executiveProfile.contact.officialEmail}
                  </a>
                </div>
                {executiveProfile.contact.personalEmail && executiveProfile.contact.personalEmail !== executiveProfile.contact.officialEmail && (
                  <div>
                    <a href={`mailto:${executiveProfile.contact.personalEmail}`}>
                      {executiveProfile.contact.personalEmail}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="academic-divider">
            <span className="academic-divider-symbol">✦</span>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-crimson-900)', marginBottom: '0.75rem' }}>
              Official Documents Download
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a
                href="/documents/Prof_Manoj_Kumar_Curriculum_Vitae.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-download-btn"
                style={{ flex: 1, minWidth: '180px', margin: 0 }}
                download
              >
                <Download size={14} />
                <span>Complete CV (PDF)</span>
              </a>
              <a
                href="/documents/Prof_Manoj_Kumar_Brief_Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-download-btn sidebar-download-alt"
                style={{ flex: 1, minWidth: '180px', margin: 0 }}
                download
              >
                <Download size={14} />
                <span>Brief Profile (PDF)</span>
              </a>
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
                Thank you, {formData.fullName}. Your correspondence has been dispatched to the Office of the Vice-Chancellor.
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
