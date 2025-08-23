// src/components/ui/TeamMember.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TeamMember as TeamMemberType } from '@/types/data';
import styles from '@/styles/components/TeamMember.module.css';

interface TeamMemberProps {
  member: TeamMemberType;
  index?: number;
}

const memberVariants = {
  hidden: { 
    opacity: 0,
    y: 60,
    scale: 0.9
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
      delay: index * 0.1
    }
  })
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const socialIconVariants = {
  initial: { scale: 1, opacity: 0.7 },
  hover: { 
    scale: 1.1,
    opacity: 1,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export const TeamMember: React.FC<TeamMemberProps> = ({ member, index = 0 }) => {
  return (
    <motion.div 
      className={styles.teamMember}
      variants={memberVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
    >
      <div className={styles.memberCard}>
        <div className={styles.imageContainer}>
          <motion.div 
            className={styles.imageWrapper}
            variants={imageVariants}
          >
            <Image 
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.memberImage}
            />
          </motion.div>
          
          {/* Social Links Overlay */}
          <div className={styles.socialOverlay}>
            <div className={styles.socialLinks}>
              {member.socialLinks.linkedin && (
                <motion.a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  variants={socialIconVariants}
                  whileHover="hover"
                  initial="initial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
              )}
              
              {member.socialLinks.twitter && (
                <motion.a
                  href={member.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  variants={socialIconVariants}
                  whileHover="hover"
                  initial="initial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
              )}
              
              {member.socialLinks.portfolio && (
                <motion.a
                  href={member.socialLinks.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  variants={socialIconVariants}
                  whileHover="hover"
                  initial="initial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </motion.a>
              )}
              
              {member.socialLinks.email && (
                <motion.a
                  href={`mailto:${member.socialLinks.email}`}
                  className={styles.socialLink}
                  variants={socialIconVariants}
                  whileHover="hover"
                  initial="initial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.memberInfo}>
          <h3 className={styles.memberName}>{member.name}</h3>
          <p className={styles.memberTitle}>{member.title}</p>
          <blockquote className={styles.memberQuote}>
            &ldquo;{member.quote}&rdquo;
          </blockquote>
        </div>
      </div>
    </motion.div>
  );
};