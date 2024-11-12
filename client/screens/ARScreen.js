// ARScreen.js
import React, { useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroPolyline,
  ViroTrackingStateConstants,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroMaterials,
} from '@reactvision/react-viro';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

ViroMaterials.createMaterials({
  line: {
    diffuseColor: '#ff0000',
  },
});

const ARScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [qrData, setQRData] = useState(null);
  const [waypointsData, setWaypointsData] = useState(null);
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [showARScene, setShowARScene] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setQRData(data);

    // Get waypoints based on QR code data
    const dataFromQR = getWaypointsForQRData(data);
    setWaypointsData(dataFromQR);
  };

  const getWaypointsForQRData = (data) => {
    // Replace this with your actual logic
    if (data === 'qr_code_1') {
      return {
        waypoints: [
          { id: 'waypoint_1', name: 'Meeting Room', coordinates: { x: 5, y: 0, z: -3 } },
          { id: 'waypoint_2', name: 'Office', coordinates: { x: -2, y: 0, z: -4 } },
        ],
        connectors: [
          { id: 'connector_1', waypointStartId: 'waypoint_1', waypointEndId: 'waypoint_2' },
        ],
      };
    } else if (data === 'qr_code_2') {
      // Add other QR code data as needed
      return {
        waypoints: [
          { id: 'waypoint_3', name: 'Lobby', coordinates: { x: 0, y: 0, z: -2 } },
          { id: 'waypoint_4', name: 'Cafeteria', coordinates: { x: 3, y: 0, z: -5 } },
        ],
        connectors: [
          { id: 'connector_2', waypointStartId: 'waypoint_3', waypointEndId: 'waypoint_4' },
        ],
      };
    } else {
      // Handle unknown QR codes
      return null;
    }
  };

  const handleWaypointSelect = (waypoint) => {
    setSelectedWaypoint(waypoint);
    setShowARScene(true);
  };

  const scaleFactor = 0.1;

  if (!scanned) {
    // Show QR code scanner using RNCamera
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          onBarCodeRead={handleBarCodeScanned}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        >
          <View style={styles.scannerOverlay}>
            <Text style={styles.scannerText}>Scan a QR Code</Text>
          </View>
        </RNCamera>
      </View>
    );
  } else if (waypointsData && !selectedWaypoint && !showARScene) {
    // Show waypoint selection menu
    return (
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Select a Waypoint:</Text>
        <FlatList
          data={waypointsData.waypoints}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleWaypointSelect(item)}
            >
              <Text style={styles.menuItemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <Button title="Scan Again" onPress={() => { setScanned(false); setQRData(null); }} />
      </View>
    );
  } else if (showARScene && selectedWaypoint) {
    // Show AR scene with guided path
    return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => (
            <ARScene
              waypointsData={waypointsData}
              selectedWaypoint={selectedWaypoint}
              scaleFactor={scaleFactor}
            />
          ),
        }}
        style={styles.f1}
      />
    );
  } else {
    // Handle case where no waypoints data is available
    return (
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>No waypoints data available for this QR code.</Text>
        <Button title="Scan Again" onPress={() => { setScanned(false); setQRData(null); }} />
      </View>
    );
  }
};

// ARScene component remains the same as your original code

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  markerTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#00ff00',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  menuTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  menuItem: {
    padding: 12,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 18,
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  scannerText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default ARScreen;
