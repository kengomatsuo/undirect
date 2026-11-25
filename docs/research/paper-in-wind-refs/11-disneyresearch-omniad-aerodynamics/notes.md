# 11 Disney Research: "OmniAD: Data-driven Omni-directional Aerodynamics"

- URL: https://www.youtube.com/watch?v=OUxsZCNs3Kg
- Creator: DisneyResearchHub; authors on the title card: Tobias Martin (ETH Zurich), Nobuyuki Umetani (Disney Research Zurich), Bernd Bickel (IST Austria). 2015.
- Kind: research method with real and simulated falls. A real object is dropped and filmed, its 3D motion is reconstructed, and a model fitted to it then simulates tumbling and gliding in real time.
- Frames: `frames/f01_t9.jpg` (real drop), `f03_t48.jpg` to `f05_t63.jpg` (capture 6-8 videos, track markers, Kalman filter to 3D motion), `f06_t75.jpg` (force and torque model), `f07_t90.jpg` (real vs synthetic), `f08_t105.jpg` (many bodies tumbling). Page: `page.jpg`, `page.txt`.

## What makes it read as real
- The page says it "enables realistic realtime simulation of rigid bodies, such as the tumbling and gliding of leaves, without simulating the surrounding air". That is the gap our Blender cloth showed: it glides but never tumbles, because tumbling comes from lift and torque that depend on the angle to the airflow.
- Shows the real-versus-synthetic comparison side by side: the fitted model reproduces the real object's swinging and flipping.

## How it was made
Film a falling object 6-8 times with one camera, track 2D markers, reconstruct 3D motion with Kalman filters, fit force and torque as functions of wind direction (spherical harmonics), then simulate (video and description). For us: a per-sheet force and torque that depend on the sheet's angle to the wind (a small script driving a rigid or soft sheet) is the route to real tumbling; the fit itself is more than we need.
