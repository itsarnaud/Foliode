"use client";

import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 secondes
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <p>Dashboard</p>
    </>
  )
}