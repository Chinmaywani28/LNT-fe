import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Drawer, IconButton } from '@mui/material';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: grey[100],
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.background.default,
    }),
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[800],
    }),
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[500],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[900],
    }),
    cursor: 'pointer',
}));

function SwipeableEdgeDrawer(props) {
    const { window } = props;
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            {/* <SwipeableDrawer
        container={container}
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
            sx: {
              transform: 'translateY(250px)'
            },
          }}
      >
        <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfEh60F3xAIIdPh7dNLIP306_lffrBtu9IgQ&s' width='98%' height='500px' style={{ margin : 'auto'}}/>
        </StyledBox>
        <StyledBox
          sx={{
            position: 'relative',
            top: drawerBleeding + 100,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller onClick={toggleDrawer(false)}/>
          <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
        </StyledBox>
      </SwipeableDrawer> */}
            <SwipeableDrawer
                container={container}
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                // swipeAreaWidth={drawerBleeding}
                // disableSwipeToOpen={false}
                // ModalProps={{
                //     keepMounted: true,
                //     top : 125
                // }}
                sx={{
                    position: 'relative',
                    top: 125,  // This will adjust the top position of the drawer
                }}
                // PaperProps={{
                //     sx: {
                //         position: 'absolute',
                //         top: '125px',  // Position the drawer 250px from the top
                //         left: 0,
                //         right: 0,
                //         width: '100%',  // You can adjust the width if needed
                //     },
                // }}
            >
                <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfEh60F3xAIIdPh7dNLIP306_lffrBtu9IgQ&s"
                        width="98%"
                        height="500px"
                        // style={{ margin: 'auto' }}
                    />
                </StyledBox>
                <StyledBox
                    sx={{
                        position: 'relative',
                        top: open ? 0 : drawerBleeding + 50 ,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        pointerEvents: 'auto', // Ensure the Puller is clickable when drawer is closed
                    }}
                >
                    <Puller onClick={toggleDrawer(open ? false :  true)} />
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

SwipeableEdgeDrawer.propTypes = {
    window: PropTypes.func,
};

export default SwipeableEdgeDrawer;

