'use client'


export default function PersonalLoanPage(): JSX.Element {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <img
        src="/background-image.jpg"
        alt="Background Image"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', zIndex: 1 }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', background: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}>
          <h2>A personal loan for</h2>
          <p>your personal needs</p>
          <p>Check your rate in 5 minutes.</p>
          <p>Get funded in as fast as 1 business day.</p>
          <p>36% lower rates as compared to a traditional model.</p>
          <p>Won’t affect your credit score</p>
        </div>
      </div>
    </div>
  );
}
