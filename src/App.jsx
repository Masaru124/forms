import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, Check, Copy, RotateCcw, MessageCircle } from 'lucide-react';

export default function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [selectedPurposes, setSelectedPurposes] = useState(['🏠 Personal use']);
  const [selectedLocations, setSelectedLocations] = useState(['North Bengaluru (Airport & STRR Corridor)']);
  const [customLocation, setCustomLocation] = useState('');

  const togglePurpose = (purpose) => {
    setSelectedPurposes((prev) => {
      if (prev.includes(purpose)) {
        return prev.filter((item) => item !== purpose);
      } else {
        return [...prev, purpose];
      }
    });
  };

  const toggleLocation = (loc) => {
    setSelectedLocations((prev) => {
      if (prev.includes(loc)) {
        return prev.filter((item) => item !== loc);
      } else {
        return [...prev, loc];
      }
    });
  };
  const [propertyType, setPropertyType] = useState('Residential Plot');
  const [plotSize, setPlotSize] = useState('30*40');
  const [customWidth, setCustomWidth] = useState('30');
  const [customLength, setCustomLength] = useState('40');
  const [budget, setBudget] = useState('₹35 Lakhs - ₹50 Lakhs');
  const [timeline, setTimeline] = useState('Within 30 Days (Ready)');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullNameInputRef = useRef(null);
  const q1CardRef = useRef(null);
  const formRef = useRef(null);
  const successCardRef = useRef(null);

  const WHATSAPP_NUMBER = '918431909508';
  const DISPLAY_PHONE = '+91 84319 09508';

  const purposeOptions = [
    { id: 'personal', emoji: '🏠', title: 'Personal use', fullLabel: '🏠 Personal use', desc: 'Custom home or private villa' },
    { id: 'investment', emoji: '📈', title: 'Investment', fullLabel: '📈 Investment', desc: 'High capital appreciation & ROI' },
    { id: 'rental', emoji: '💰', title: 'Rental Income', fullLabel: '💰 Rental Income', desc: 'High-yield recurring cash flow' },
    { id: 'family_asset', emoji: '🏡', title: 'Future Use / Family Asset', fullLabel: '🏡 Future Use / Family Asset', desc: 'Generational wealth & security' }
  ];

  const locationOptions = [
    'North Bengaluru (Airport & STRR Corridor)',
    'East Bengaluru (Budigere Cross & Hoskote)',
    'Sarjapur Road / Outer Ring Road',
    'Whitefield',
    'Kanakapura Road / NICE Corridor',
    'Mysore Road / West Bengaluru',
    'Other / Custom Locality'
  ];

  const propertyTypeOptions = [
    { label: 'Residential Plot', sub: 'Land only • Design and build your custom home' },
    { label: 'Luxury Villa Plot', sub: 'Gated enclave with clubhouse & resort amenities' },
    { label: 'Ready to Move Plot', sub: 'Immediate A-Khata registration & clear titles' },
    { label: 'Apartments', sub: '2, 3 & 4 BHK premium high-rise residences' }
  ];

  const plotSizeOptions = [
    { id: '20*30', label: '20 x 30 (600 sq.ft)', desc: 'Compact duplex or high-yield rental' },
    { id: '30*40', label: '30 x 40 (1200 sq.ft)', desc: 'Most popular Bengaluru standard home size' },
    { id: '30*50', label: '30 x 50 (1500 sq.ft)', desc: 'Spacious 4 BHK villa with garden layout' },
    { id: '40*60', label: '40 x 60 (2400 sq.ft)', desc: 'Luxury mansion footprint with private drive' },
    { id: '50*60', label: '50 x 60 (3000 sq.ft)', desc: 'Grand estate layout with expansive setbacks' },
    { id: 'custom', label: 'Custom Dimensions', desc: 'Specify bespoke frontage and depth' }
  ];

  const budgetOptions = [
    'Under ₹35 Lakhs',
    '₹35 Lakhs - ₹50 Lakhs',
    '₹50 Lakhs - ₹75 Lakhs',
    '₹75 Lakhs - ₹1.2 Crore',
    'Above ₹1.2 Crore'
  ];

  const timelineOptions = [
    'Within 30 Days (Ready)',
    'Next 1 - 3 Months',
    '6+ Months / Research'
  ];

  const resolvedPlotSizeStr = plotSize === 'custom'
    ? `${customWidth || 30} x ${customLength || 40} (${(Number(customWidth) || 30) * (Number(customLength) || 40)} sq.ft)`
    : plotSize === '20*30' ? '20 x 30 (600 sq.ft)'
    : plotSize === '30*40' ? '30 x 40 (1200 sq.ft)'
    : plotSize === '30*50' ? '30 x 50 (1500 sq.ft)'
    : plotSize === '40*60' ? '40 x 60 (2400 sq.ft)'
    : '50 x 60 (3000 sq.ft)';

  const resolvedLocationsList = selectedLocations.map((loc) => {
    if (loc === 'Other / Custom Locality') {
      return customLocation.trim() ? `${customLocation.trim()} (Custom)` : 'Custom Locality';
    }
    return loc;
  });

  const resolvedLocationStr = resolvedLocationsList.length > 0
    ? resolvedLocationsList.join(', ')
    : 'None selected';

  const resolvedPurposeStr = selectedPurposes.length > 0
    ? selectedPurposes.join(', ')
    : 'None selected';

  const buildWhatsAppMessage = () => {
    return `*NEW PROPERTY INQUIRY VIA SMART FINDER*
━━━━━━━━━━━━━━━━━━━━
• Full Name: ${fullName.trim()}
• Contact / WhatsApp: ${countryCode} ${phone.trim()}
• Purpose of Purchase: ${resolvedPurposeStr}
• Preferred Locations: ${resolvedLocationStr}
• Property Category: ${propertyType}
• Plot Dimensions / Size: ${resolvedPlotSizeStr}
• Estimated Budget: ${budget}
• Purchase Readiness: ${timeline}
━━━━━━━━━━━━━━━━━━━━
• Request: Hello Premium Properties Advisory! I have completed the Smart Finder inquiry. Please send me verified RERA masterplans, available corner/standard plot layouts, and direct developer pricing for these specifications.`;
  };

  const handleStartForm = () => {
    setIsFormStarted(true);
    setTimeout(() => {
      if (fullNameInputRef.current) {
        fullNameInputRef.current.focus();
      }
      if (q1CardRef.current) {
        q1CardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 80);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your Full Name.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      if (fullNameInputRef.current) fullNameInputRef.current.focus();
      return;
    }

    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 8) {
      setErrorMsg('Please enter a valid 10-digit mobile or WhatsApp number.');
      window.scrollTo({ top: 220, behavior: 'smooth' });
      return;
    }

    if (selectedPurposes.length === 0) {
      setErrorMsg('Please select at least one Purpose of Purchase.');
      return;
    }

    if (selectedLocations.length === 0) {
      setErrorMsg('Please select at least one preferred location.');
      return;
    }

    if (selectedLocations.includes('Other / Custom Locality') && !customLocation.trim()) {
      setErrorMsg('Please specify your preferred custom locality name.');
      return;
    }

    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
    setTimeout(() => {
      if (successCardRef.current) {
        successCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsFormStarted(false);
    setFullName('');
    setPhone('');
    setSelectedPurposes(['🏠 Personal use']);
    setSelectedLocations(['North Bengaluru (Airport & STRR Corridor)']);
    setCustomLocation('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Branding Navigation in Deep Navy */}
      <header className="top-nav">
        <div className="top-nav-inner">
          <div className="brand">
            <span className="brand-crest">✦</span>
            <span className="brand-text">LAKSHIE REAL ESTATE</span>
            <span className="brand-divider">|</span>
            <span className="brand-sub">PREMIUM PLOTS BENGALURU</span>
          </div>
          <div className="top-whatsapp">
            <span className="top-wa-label">WhatsApp Helpline:</span>
            <a
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-phone-number"
            >
              {DISPLAY_PHONE}
            </a>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="form-container">

        {/* 1. Header Google Form Card */}
        <section className="card header-card">
          <div className="card-top-bar" />
          <div className="header-card-content">
            <div className="header-badge">
              <Sparkles size={14} />
              <span>PROPERTY FINDER CONSULTATION</span>
            </div>

            <h1 className="main-title">Find Your Ideal Plot or Property in Bengaluru</h1>


            {/* Trust Pills in Navy */}
            <div className="trust-pills">
              <div className="trust-pill">✓ 100% RERA & BIAAPA Verified</div>
              <div className="trust-pill">✓ 0% Brokerage</div>
              <div className="trust-pill">✓ Direct Developer Allotment</div>
            </div>

            {/* Initial Start / Open Form Action */}
            {!isFormStarted && !isSubmitted && (
              <div className="start-action-container">
                <button
                  type="button"
                  onClick={handleStartForm}
                  className="btn-navy btn-start"
                >
                  <span>Book Consultation & Open Form</span>
                  <ArrowRight size={18} className="btn-arrow" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 2. Success Confirmation View */}
        {isSubmitted && (
          <section ref={successCardRef} className="card success-card">
            <div className="card-top-bar" />
            <div className="success-content">
              <div className="success-icon-wrap">
                <Check size={36} className="success-check-icon" />
              </div>

              <h2 className="success-title">Inquiry Prepared & Ready!</h2>

              <p className="success-desc">
                Your inquiry has been generated for <strong>{fullName}</strong>. Dispatch directly to our senior land advisor on WhatsApp:
              </p>

              <div className="success-actions">
                <a
                  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(buildWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy btn-success-wa"
                >
                  <MessageCircle size={20} />
                  <span>Open in WhatsApp</span>
                  <span className="gold-phone-number">({DISPLAY_PHONE})</span>
                </a>

                <div className="success-secondary-buttons">
                  <button type="button" onClick={handleCopy} className="btn-outline">
                    <Copy size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    <span>{copied ? '✓ Copied to Clipboard!' : 'Copy Inquiry Text'}</span>
                  </button>

                  <button type="button" onClick={handleReset} className="btn-outline">
                    <RotateCcw size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    <span>Start New Search</span>
                  </button>
                </div>
              </div>

              <div className="query-preview-box">
                <div className="preview-label">Generated Inquiry Message:</div>
                <pre className="preview-text">{buildWhatsAppMessage()}</pre>
              </div>
            </div>
          </section>
        )}

        {/* 3. Streamlined Google Form Questions */}
        {isFormStarted && !isSubmitted && (
          <form ref={formRef} onSubmit={handleSubmit} className="questions-container">

            {/* Validation Banner */}
            {errorMsg && (
              <div className="validation-banner">
                <span className="validation-icon">⚠️</span>
                <span className="validation-text">{errorMsg}</span>
              </div>
            )}

            {/* Question 1: Full Name */}
            <div ref={q1CardRef} className="card question-card">
              <label htmlFor="fullNameInput" className="question-label">
                1. Your Full Name <span className="required-star">*</span>
              </label>
              <input
                ref={fullNameInputRef}
                id="fullNameInput"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Anand Kumar"
                className="form-input"
              />
            </div>

            {/* Question 2: Contact / WhatsApp Number */}
            <div className="card question-card">
              <label htmlFor="phoneInput" className="question-label">
                2. Contact / WhatsApp Number <span className="required-star">*</span>
              </label>
              <div className="phone-input-group">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="form-select country-select"
                >
                  <option value="+91">🇮🇳 +91 (India)</option>
                  <option value="+971">🇦🇪 +971 (UAE)</option>
                  <option value="+1">🇺🇸 +1 (USA)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+65">🇸🇬 +65 (Singapore)</option>
                  <option value="+61">🇦🇺 +61 (Australia)</option>
                </select>
                <input
                  id="phoneInput"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="form-input phone-input"
                />
              </div>
            </div>

            {/* Question 3: Purpose of Purchase */}
            <div className="card question-card">
              <div className="question-header-row">
                <label className="question-label">
                  3. Purpose of Purchase <span className="required-star">*</span>
                </label>
                {selectedPurposes.length > 0 && (
                  <span className="selection-count-badge">
                    {selectedPurposes.length} selected
                  </span>
                )}
              </div>
              <p className="question-subtext">
                Select one or more intended goals for this property acquisition.
              </p>

              <div className="purpose-grid">
                {purposeOptions.map((item) => {
                  const isChecked = selectedPurposes.includes(item.fullLabel);
                  return (
                    <label
                      key={item.id}
                      className={`purpose-card-option ${isChecked ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePurpose(item.fullLabel)}
                      />
                      <div className="purpose-card-content">
                        <div className="purpose-title-row">
                          <span className="purpose-icon">{item.emoji}</span>
                          <span className="purpose-title">{item.title}</span>
                        </div>
                        <span className="purpose-desc">{item.desc}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Question 4: Preferred Location(s) in Bengaluru */}
            <div className="card question-card">
              <div className="question-header-row">
                <label className="question-label">
                  4. Preferred Location(s) in Bengaluru <span className="required-star">*</span>
                </label>
                {selectedLocations.length > 0 && (
                  <span className="selection-count-badge">
                    {selectedLocations.length} selected
                  </span>
                )}
              </div>
              <p className="question-subtext">
                Select one or more target investment growth corridors or specify a custom locality.
              </p>

              <div className="options-list">
                {locationOptions.map((loc) => {
                  const isChecked = selectedLocations.includes(loc);
                  return (
                    <label
                      key={loc}
                      className={`option-item checkbox-card ${isChecked ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleLocation(loc)}
                      />
                      <span className="option-text">{loc}</span>
                    </label>
                  );
                })}
              </div>

              {selectedLocations.includes('Other / Custom Locality') && (
                <div className="custom-input-wrapper">
                  <input
                    type="text"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder="Type your locality: e.g. Hebbal, JP Nagar, HSR Layout, Budigere Cross..."
                    className="form-input"
                  />
                </div>
              )}
            </div>

            {/* Question 5: Type of Property */}
            <div className="card question-card">
              <label className="question-label">
                5. Type of Property <span className="required-star">*</span>
              </label>
              <p className="question-subtext">Choose your desired property development class.</p>

              <div className="options-grid">
                {propertyTypeOptions.map((type) => (
                  <label
                    key={type.label}
                    className={`grid-card-option ${propertyType === type.label ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      checked={propertyType === type.label}
                      onChange={() => setPropertyType(type.label)}
                    />
                    <div className="grid-card-content">
                      <span className="grid-title">{type.label}</span>
                      <span className="grid-desc">{type.sub}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 6: Plot Dimensions / Size */}
            <div className="card question-card">
              <label className="question-label">
                6. Plot Dimensions / Size <span className="required-star">*</span>
              </label>
              <p className="question-subtext">
                Standard Bengaluru plot footprints or bespoke dimensions.
              </p>

              <div className="options-grid">
                {plotSizeOptions.map((item) => (
                  <label
                    key={item.id}
                    className={`grid-card-option ${plotSize === item.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="plotSize"
                      checked={plotSize === item.id}
                      onChange={() => setPlotSize(item.id)}
                    />
                    <div className="grid-card-content">
                      <span className="grid-title">{item.label}</span>
                      <span className="grid-desc">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {plotSize === 'custom' && (
                <div className="custom-dimensions-grid">
                  <div>
                    <label htmlFor="customWidth" className="custom-field-label">Frontage Width (ft)</label>
                    <input
                      id="customWidth"
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      placeholder="30"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="customLength" className="custom-field-label">Depth Length (ft)</label>
                    <input
                      id="customLength"
                      type="number"
                      value={customLength}
                      onChange={(e) => setCustomLength(e.target.value)}
                      placeholder="40"
                      className="form-input"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Question 7: Estimated Budget */}
            <div className="card question-card">
              <label className="question-label">
                7. Estimated Budget <span className="required-star">*</span>
              </label>
              <p className="question-subtext">Choose your planned investment allocation range.</p>

              <div className="options-grid">
                {budgetOptions.map((b) => (
                  <label
                    key={b}
                    className={`grid-card-option ${budget === b ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      checked={budget === b}
                      onChange={() => setBudget(b)}
                    />
                    <div className="grid-card-content">
                      <span className="grid-title">{b}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 8: Purchase Readiness / Timeline */}
            <div className="card question-card">
              <label className="question-label">
                8. Purchase Readiness / Timeline
              </label>
              <p className="question-subtext">When are you planning to finalize your site visit and booking?</p>

              <div className="timeline-button-group">
                {timelineOptions.map((t) => (
                  <label key={t} className="timeline-btn-label">
                    <input
                      type="radio"
                      name="timeline"
                      checked={timeline === t}
                      onChange={() => setTimeline(t)}
                    />
                    <span className="timeline-btn-text">{t}</span>
                  </label>
                ))}
              </div>
            </div>


            {/* Submit Card */}
            <div className="submit-action-card">
              <button type="submit" className="btn-navy btn-submit">
                <MessageCircle size={20} />
                <span>Submit & Send to WhatsApp</span>
                <span className="gold-phone-number">({DISPLAY_PHONE})</span>
              </button>
              <p className="submit-security-note">
                🔒 Zero spam. We exclusively dispatch verified RERA layouts and direct developer pricing sheets.
              </p>
            </div>

          </form>
        )}

      </main>

      {/* Minimal Footer */}
      <footer className="bottom-bar">
        <div className="bottom-bar-inner">
          <span>© Lakshie Real Estate • Premium Bengaluru Plotted Developments</span>
          <span className="footer-wa">
            Direct WhatsApp: <span className="gold-phone-number">{DISPLAY_PHONE}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
