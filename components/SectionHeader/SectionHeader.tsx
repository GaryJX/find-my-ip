import React, { useState } from 'react'
import styles from './SectionHeader.module.scss'

type SectionHeaderProps = {
  title: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return <div className={styles.sectionHeader}>{title}</div>
}

export default SectionHeader
