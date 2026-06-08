import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const ProtectedRoute = ({ children, requiredAccessLevel  }) => {
  const [userAccessLevel, setUserAccessLevel] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [component,setComponent] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = () => {
      const role = sessionStorage.getItem("role");
      const comp = sessionStorage.getItem('floorK');
 
      setUserAccessLevel(role);
      setComponent(comp);

      if (role !== requiredAccessLevel && comp !== 'カスタム・フロア') {
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/home'); 
        }, 2000); 
      }
    };

    setTimeout(checkAccess, 100);
  }, [requiredAccessLevel, navigate]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (userAccessLevel === requiredAccessLevel  || component === 'カスタム・フロア') {
    return children;
  }

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          Access Denied! You do not have the required permissions.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProtectedRoute;
