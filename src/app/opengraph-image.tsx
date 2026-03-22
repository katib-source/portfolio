import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#F0EBDF',
          padding: '64px',
          fontFamily: 'Outfit, sans-serif',
          color: '#1A1A2E',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '32px',
            border: '2px solid #DDD8CC',
            borderRadius: '20px',
            background: '#FDFCF8',
          }}
        />
        <div
          style={{
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', color: '#3E5F9D', fontSize: 30, fontWeight: 600 }}>
            Portfolio
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: 82, lineHeight: 1, fontWeight: 700 }}>KATIB KACHI</div>
            <div style={{ fontSize: 40, color: '#4A4A5A', fontWeight: 500 }}>Data Science & IA | Alternance</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 30, color: '#7A7A8A' }}>
            <span>Universite Cote d&apos;Azur</span>
            <span style={{ color: '#3E5F9D', fontWeight: 600 }}>www.katib.me</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
