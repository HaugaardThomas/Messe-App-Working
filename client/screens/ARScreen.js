import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroPolyline,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");
  const [qrCodeDetected, setQRCodeDetected] = useState(false); // Track QR code detection

  // Function to handle AR tracking initialization
  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("AR Tracking Active");
      setQRCodeDetected(true); // Simulate QR code detection as origin
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("AR Tracking Unavailable");
    }
  }

  // Hardcoded data for testing
  const hardcodedData = {
    qrCodePosition: { x: 0, y: 0, z: 0 }, // Simulating the QR code as the origin
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

  // Translate floor plan coordinates to AR coordinates relative to QR code
  const translateToARCoordinates = (qrCodePosition, markerPosition) => ({
    x: qrCodePosition.x + markerPosition.x * scaleFactor,
    y: qrCodePosition.y,
    z: qrCodePosition.z + markerPosition.z * scaleFactor,
  });

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -5]}
        style={styles.helloWorldTextStyle}
      />

      {/* Render waypoints only after QR code is detected */}
      {qrCodeDetected && hardcodedData.waypoints.map((waypoint) => {
        const position = translateToARCoordinates(hardcodedData.qrCodePosition, waypoint.coordinates);
        return (
          <ViroText
            key={waypoint.id}
            text={waypoint.name}
            position={[position.x, position.y, position.z]}
            scale={[0.5, 0.5, 0.5]}
            style={styles.markerTextStyle}
          />
        );
      })}

      {/* Render connectors only after QR code is detected */}
      {qrCodeDetected && hardcodedData.connectors.map((connector) => {
        const start = hardcodedData.waypoints.find((w) => w.id === connector.waypointStartId);
        const end = hardcodedData.waypoints.find((w) => w.id === connector.waypointEndId);

        if (start && end) {
          const startPos = translateToARCoordinates(hardcodedData.qrCodePosition, start.coordinates);
          const endPos = translateToARCoordinates(hardcodedData.qrCodePosition, end.coordinates);

          return (
            <ViroPolyline
              key={connector.id}
              points={[
                [startPos.x, startPos.y, startPos.z],
                [endPos.x, endPos.y, endPos.z]
              ]}
              thickness={0.05}
            />
          );
        }
        return null;
      })}
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
