import ParticleText from '@/components/ui/shared/ParticleText'
import React from 'react'

const page = () => {
  return (
    <div>
      <div style={{ width: '100%', height: 360, background: '#09090f' }}>
        <ParticleText
          text="blogs.bismay"
          particleSize={2.2}
          density={6}
          color="#f8fafc"
          highlightColor="#8b5cf6"
          scatter={190}
          gatherDuration={1600}
          stagger={420}
          pointerRepel={62}
          repelRadius={120}
          idleDrift={0.8}
          trigger="mount"
          fontSize="clamp(3.5rem, 13vw, 9rem)"
          fontWeight={800}
          fontFamily="inherit"
          glow
        />
      </div>
    </div>
  )
}

export default page
