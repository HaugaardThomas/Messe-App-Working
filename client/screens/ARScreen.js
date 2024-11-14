// ARScreen.js
import React, { useState, useEffect } from 'react';
 import { Camera, CameraType } from 'expo-camera';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroMaterials,
} from '@reactvision/react-viro';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Button } from 'react-native';

ViroMaterials.createMaterials({
  line: {
    diffuseColor: '#ff0000',
  },
});

const ARScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQRData] = useState(null);
  const [waypointsData, setWaypointsData] = useState(null);
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [showARScene, setShowARScene] = useState(false);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQRData(data);

    // Get waypoints based on QR code data
    const dataFromQR = getWaypointsForQRData(data);
    setWaypointsData(dataFromQR);
  };

  const getWaypointsForQRData = (data) => {
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
      return null;
    }
  };

  const handleWaypointSelect = (waypoint) => {
    setSelectedWaypoint(waypoint);
    setShowARScene(true);
  };

  const scaleFactor = 0.1;

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera.</Text>
        <Button title="Allow Camera" onPress={() => Camera.requestCameraPermissionsAsync()} />
      </View>
    );
  }

  if (!scanned) {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={CameraType.back}
          onBarCodeScanned={handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeType.qr],
          }}
        >
          <View style={styles.scannerOverlay}>
            <Text style={styles.scannerText}>Scan a QR Code</Text>
          </View>
        </Camera>
      </View>
    );
  } else if (waypointsData && !selectedWaypoint && !showARScene) {
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
        <Button
          title="Scan Again"
          onPress={() => {
            setScanned(false);
            setQRData(null);
          }}
        />
      </View>
    );
  } else if (showARScene && selectedWaypoint) {
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
    return (
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>No waypoints data available for this QR code.</Text>
        <Button
          title="Scan Again"
          onPress={() => {
            setScanned(false);
            setQRData(null);
          }}
        />
      </View>
    );
  }
};

// Define ARScene component if needed
const ARScene = ({ waypointsData, selectedWaypoint, scaleFactor }) => {
  // Placeholder for ARScene content
  return (
    <ViroARScene>
      {/* Your AR code goes here */}
    </ViroARScene>
  );
};

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
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scannerText: {
    fontSize: 24,
    color: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ARScreen;
