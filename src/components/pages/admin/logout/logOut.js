import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useNavigate} from "react-router";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: 0,
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  backgroundColor: 'background.paper',
};

export default function LogOut({logOut,setLogOut}) {

  const handleClose = () => setLogOut(false);
  const navigate = useNavigate();

  const logOutInAdmin = () => {
    localStorage.removeItem('admin');
    navigate('/admin')
  };

  return (
    <div>
      <Modal
        open={logOut}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="d-flex justify-content-center mt-0 mb-4">
              <span className="fs-3 font-monospace">Do you really want to out?</span>
            </div>
            <div className="d-flex justify-content-evenly">
              <button type="button" className="btn btn-danger fs-3" onClick={ logOutInAdmin }>Log Out</button>
              <button type="button" className="btn btn-secondary fs-3" onClick={() => setLogOut(false)}>Close</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}