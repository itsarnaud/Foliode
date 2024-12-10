"use client";

import React, { useState, useEffect } from 'react';
import Loader from '../../../components/Loader/Loader';

export default function Projects() {

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
      <p>Projects</p>
    </>
  )
}
/*
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      // Remplacez cette ligne par votre appel API réel
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading) {
  return <Loader />;
}*/