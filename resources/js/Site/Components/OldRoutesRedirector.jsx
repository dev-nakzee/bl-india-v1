import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import urlMappings from '../Data/urlMapping.json'; // Adjust the path based on where you store the file

const OldRoutesRedirector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Convert current URL to a format without the protocol and hostname
    const currentPath = `${window.location.pathname}${window.location.search}`;

    // Find a match in the URL mappings
    const match = urlMappings.find(mapping => {
      const url = new URL(mapping.old_url);
      return `${url.pathname}${url.search}` === currentPath;
    });

    // If a match is found, navigate to the new URL
    if (match) {
      const newUrl = new URL(match.new_url);
      navigate(newUrl.pathname + newUrl.search, { replace: true });
    }
  }, [location, navigate]);

  return null; // This component does not render anything
};

export default OldRoutesRedirector;
