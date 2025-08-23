// src/components/sections/TeamSection.tsx
'use client';

import { motion } from 'framer-motion';
import { TeamMember } from '@/components/ui/TeamMember';
import { teamMembers } from '@/lib/data/team-members';
import styles from '@/styles/components/TeamSection.module.css';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30
    }
  }
};

export const TeamSection = () => {
  // Show only the first team member for now
  const featuredMember = teamMembers[0];

  return (
    <motion.section 
      className={styles.teamSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <motion.div 
          className={styles.sectionHeader}
          variants={titleVariants}
        >
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.sectionDescription}>
            Passionate creators dedicated to bringing your vision to life
          </p>
        </motion.div>

        <div className={styles.teamGrid}>
          <TeamMember 
            member={featuredMember}
            index={0}
          />
        </div>
      </div>
    </motion.section>
  );
};