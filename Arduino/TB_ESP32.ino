#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLECharacteristic *pCharacteristic;

bool deviceConnected = false;
int txValue = 0;

#define SERVICE_UUID "FFE0"
#define CHARACTERISTIC_UUID_TX "FFE1"
#define CHARACTERISTIC_UUID_RX "FFE2"

class MyServerCallbacks : public BLEServerCallbacks
{
    void onConnect(BLEServer *pServer)
    {
        deviceConnected = true;
    }

    void onDisconnect(BLEServer *pServer)
    {
        deviceConnected = false;
    }
};

#define NXP 36
float getPressure()
{
    float sensorReading = analogRead(NXP) * (5.0 / 1023.0);
    return ((sensorReading - 0.2) / (4.8 - 0.2)) * 0.87;
}
void checkSendPressure_BT(){
    float pressure = getPressure();
    int pressureInt = int(pressure * 100);
    Serial.println(pressureInt);
    pCharacteristic->setValue(pressureInt);
    pCharacteristic->notify();
    delay(150);
}

void setup() {
  Serial.begin(115200);
  BLEDevice::init("TBB");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);

  pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID_TX,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY
    );
  pCharacteristic->addDescriptor(new BLE2902());
  pService->start();
  pServer->getAdvertising()->start();
}

void loop()
{
    if (deviceConnected)
    {
      checkSendPressure_BT();
      delay(50);
    }
}