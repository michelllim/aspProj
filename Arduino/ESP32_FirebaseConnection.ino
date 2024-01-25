#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "TP-STUDENT"
#define WIFI_USERNAME "2201198E"
#define WIFI_PASSWORD = "Prcss20221tp";
#define API_KEY "AIzaSyA1zhvsZHlRTynqMCETzGrx2qZ8CyrSXCE"
#define DATABASE_URL "https://console.firebase.google.com/u/0/project/aspproject-6b683/database/aspproject-6b683-default-rtdb/data/~2F"

#define LED1_PIN 12
#define LED2_PIN 14
#define LDR_PIN 36
#define PWMChannel 0

const int freq = 5000;
const int resolution = 8;

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;
int ldrData = 0;
float voltage = 0.0;
int pwmValue = 0;
bool ledStatus = false;

void setup() {
  pinMode(LED1_PIN, OUTPUT);
  ledcSetup(PWMChannel, freq, resolution);
  ledcAttachPin(LED1_PIN, PWMChannel);

  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD, WIFI_USERNAME);
  Serial.print("Connecting to Wi-Fi");
  while(WiFi.status() !=WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if(Firebase.signUp(&config, &auth, "", "")){
    Serial.println("SignUp OK");
    signupOK = true;
  }else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

}

void loop() {
  if(Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    //--------STORE sensor data to a RTDB
    ldrData = analogRead(LDR_PIN); //remember change
    voltage = (float)analogReadMilliVolts(LDR_PIN)/1000;
    
    if(Firebase.RTDB.setInt(&fbdo,"Sensor/ldr_data", ldrData)){
      Serial.println(); Serial.print(ldrData);
      Serial.print(" - successfully saved to: " + fbdo.dataPath());
      Serial.println(" (" + fbdo.dataType() + ")");
    }else{
      Serial.println("FAILED: " + fbdo.errorReason());
    }

    if(Firebase.RTDB.setFloat(&fbdo,"Sensor/voltage", voltage)){
     Serial.print(voltage);
      Serial.print(" - successfully saved to: " + fbdo.dataPath());
      Serial.println(" (" + fbdo.dataType() + ")");
    }else{
      Serial.println("FAILED: " + fbdo.errorReason());
    }

    //----------READ data from RTDB to control devices attached to the ESP32
    if(Firebase.RTDB.getInt(&fbdo, "/LED/analog")){
      if(fbdo.dataType() == "int"){
        pwmValue = fbdo.intData();
        Serial.println("Successful READ from " + fbdo.dataPath() + ": " + pwmValue + " (" + fbdo.dataType() + ")");
        ledcWrite(PWMChannel, pwmValue);
      }
    }else{
      Serial.println("FAILED: " + fbdo.errorReason());
    }

    if(Firebase.RTDB.getBool(&fbdo, "/LED/digital")){
      if(fbdo.dataType() == "boolean"){
        ledStatus = fbdo.boolData();
        Serial.println("Successful READ from " + fbdo.dataPath() + ": " + ledStatus + " (" + fbdo.dataType() + ")");
        digitalWrite(LED2_PIN, ledStatus);
      }
    }else{
      Serial.println("FAILED: " + fbdo.errorReason());
    }

  }
}
