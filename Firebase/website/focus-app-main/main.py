#!/usr/bin/env python
# coding: utf-8

# ## Main File To Run Code

# ## Imports

# In[7]:


import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)


# In[8]:


import firebase_admin
from firebase_admin import credentials, firestore, auth
import pandas as pd
import numpy as np
from joblib import load
from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
import sys


# ## 1 Connecting to Firebase Account

# In[3]:


cred = credentials.Certificate('./firebase-sdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


# ## 2 Create Classes

# In[4]:


feature_order = ['Name', 'Gender', 'Age', 'CountryofBirth', 'Smoking', 'Alcohol', 'FamilyHistory', 'CloseContact', 'HealthConditions', 'OccupationalRisks', 'PhysicalActivity', 'Diet', 'AirPollution', 'LongTermCough', 'ChestPain', 'AppetiteLoss', 'WeightLoss', 'Chills', 'Fatigue', 'NightSweat', 'CoughBlood', 'Fevers', 'NitricOxide']


# ## 3 Predict User's Data

# In[5]:


app = Flask(__name__)
CORS(app) 

@app.route("/")
@cross_origin()
def helloWorld():
  return "Flask Server Running"

@app.route('/do-prediction', methods=['POST'])
@cross_origin()
def receive_data_from_react():
    data = request.json
    print(data)
    user_id=data['key']
    # user_id=fetch_user_data(data)
    prediction = predict_tbpred(user_id)
    save_predictions(user_id,prediction)
    print(f"Predicted tb_pred for user {user_id}: {prediction}")
    return jsonify({'message': 'Data received successfully'})

#Function to save user's prediction results to Firestore
def save_predictions(user_id, tb_pred):
    tb_pred = round(float(tb_pred[0]), 2)  # Round to two decimal places
    data = {'tbpred': tb_pred}
    doc_ref = db.collection('predictions').document(user_id)
    doc_ref.set(data)
    return jsonify({'message': 'Data saved successfully'})

#Function to fetch prediction from Firestore
def fetch_predictions(user_id):
    doc_ref = db.collection('predictions').document(user_id)
    doc = doc_ref.get()
    if doc.exists:
        #print(doc.to_dict())
        return doc.to_dict()
    else:
        print("No such document!")
        return None

@app.route('/show-prediction/<user_id>', methods=['GET'])
@cross_origin()
def send_data_to_react(user_id):
    data=fetch_predictions(user_id)
    print(data)
    return jsonify(data)

# Function to fetch a user's data from Firestore
def fetch_user_data(user_id):
    doc_ref = db.collection('users').document(user_id)
    doc = doc_ref.get()
    if doc.exists:
        #print(doc.to_dict())
        return doc.to_dict()
    else:
        print("No such document!")
        return None

# Function to preprocess user's data
def preprocess_user_data(user_data):
    # Assuming user_data is a dictionary containing the user's features
    df = pd.DataFrame([user_data])  # Convert dict to DataFrame
    df = df[feature_order]
    # Apply the same preprocessing as your training data
    # Load label encoder and transform 'Country of Birth'
    le_country = load('label_encoder.joblib')
    df['encoded_country'] = le_country.transform(df['CountryofBirth'])
    
    # Ensure all preprocessing steps match training, including dropping unused columns
    processed_df = df.drop(['Name', 'CountryofBirth'], axis=1)
    
    # Return preprocessed user data ready for prediction
    return processed_df

# Load your trained Decision Tree model
classifier = load('classifier.joblib')

# Predict function for a user
def predict_tbpred(user_id):
    user_data = fetch_user_data(user_id)
    if user_data:
        processed_data = preprocess_user_data(user_data)
        b = classifier.predict(processed_data)
        c = classifier.predict_proba(processed_data)
        prediction = np.zeros_like(b, dtype=float)

        # Use numpy indexing to assign values based on the predicted classes
        prediction[b == 0] = c[b == 0, 0]  # Assign the first value from c where b is 0
        prediction[b == 1] = c[b == 1, 1]  # Assign the last value from c where b is 1
        print(prediction)

        return prediction*100
    else:
        return "User data not found"

if __name__ == '__main__':
    try:
        app.run(debug=False)
    except Exception as e:
        print("Error:", e)
        sys.exit(1)
# Example usage
# user_id = '4PzkRocqvKdL71AtKXiu'
# prediction = predict_tbpred(user_id)
# print(f"Predicted tb_pred for user {user_id}: {prediction}")


# # In[6]:


# get_ipython().run_line_magic('tb', '')

