import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroPolyline,
  ViroTrackingStateConstants,
  ViroARImageMarker,
  ViroARTrackingTargets,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

// 1. Create a tracking target for the QR code
ViroARTrackingTargets.createTargets({
  qrCode: {
    source: require('./res/qr_code.jpg'), // Replace with the actual path to your QR code image
    orientation: 'Up', // Assuming the QR code is upright
    physicalWidth: 0.2, // Physical width of the QR code in meters
  },
});

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");
  const [qrCodeDetected, setQRCodeDetected] = useState(false); // Track QR code detection

  // State to store QR code's position and rotation if needed
  const [qrCodePosition, setQRCodePosition] = useState({ x: 0, y: 0, z: 0 });
  const [qrCodeRotation, setQRCodeRotation] = useState({ x: 0, y: 0, z: 0 });

  // Function to handle AR tracking initialization
  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("AR Tracking Active");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("AR Tracking Unavailable");
    }
  }

  // Function called when the QR code is detected
  function onAnchorFound(anchor) {
    setQRCodeDetected(true);
    const { position, rotation } = anchor;
    setQRCodePosition({ x: position[0], y: position[1], z: position[2] });
    setQRCodeRotation({ x: rotation[0], y: rotation[1], z: rotation[2] });
  }

  // Function called when the QR code is no longer detected
  function onAnchorRemoved() {
    setQRCodeDetected(false);
  }

  // Hardcoded data for testing
  const hardcodedData = {
    waypoints: [
      { id: 'waypoint_1', name: 'Meeting Room', coordinates: { x: 5, y: 0, z: -3 } },
      { id: 'waypoint_2', name: 'Office', coordinates: { x: -2, y: 0, z: -4 } },
    ],
    connectors: [
      { id: 'connector_1', waypointStartId: 'waypoint_1', waypointEndId: 'waypoint_2' },
    ],
  };

  // Scaling factor to convert floor plan units to AR units
  const scaleFactor = 0.1;

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Display tracking status */}
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />

      {/* 2. Use ViroARImageMarker to detect the QR code */}
      <ViroARImageMarker
        target={'qrCode'}
        onAnchorFound={onAnchorFound}
        onAnchorRemoved={onAnchorRemoved}
        pauseUpdates={false} // Keep tracking active even if the QR code is out of view
      >
        {/* 3. Render waypoints and connectors as children of the QR code marker */}
        {qrCodeDetected && hardcodedData.waypoints.map((waypoint) => {
          // Convert waypoint coordinates using the scale factor
          const position = [
            waypoint.coordinates.x * scaleFactor,
            waypoint.coordinates.y * scaleFactor,
            waypoint.coordinates.z * scaleFactor,
          ];
          return (
            <ViroText
              key={waypoint.id}
              text={waypoint.name}
              position={position}
              scale={[0.5, 0.5, 0.5]}
              style={styles.markerTextStyle}
            />
          );
        })}

        {/* Render connectors between waypoints */}
        {qrCodeDetected && hardcodedData.connectors.map((connector) => {
          const start = hardcodedData.waypoints.find((w) => w.id === connector.waypointStartId);
          const end = hardcodedData.waypoints.find((w) => w.id === connector.waypointEndId);

          if (start && end) {
            const startPos = [
              start.coordinates.x * scaleFactor,
              start.coordinates.y * scaleFactor,
              start.coordinates.z * scaleFactor,
            ];
            const endPos = [
              end.coordinates.x * scaleFactor,
              end.coordinates.y * scaleFactor,
              end.coordinates.z * scaleFactor,
            ];

            return (
              <ViroPolyline
                key={connector.id}
                points={[
                  startPos,
                  endPos
                ]}
                thickness={0.05}
                materials={['line']}
              />
            );
          }
          return null;
        })}
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  markerTextStyle: {
    fontFamily: "Arial",
    fontSize: 20,
    color: "#00ff00",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

// Add a material for the polyline (optional)
ViroMaterials.createMaterials({
  line: {
    diffuseColor: '#ff0000',
  },
});
