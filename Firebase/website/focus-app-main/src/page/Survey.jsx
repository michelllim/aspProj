import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

const Survey = () => {
    const [Name, setName] = useState("");
    const [Gender, setGender] = useState(0);
    const [Age, setAge] = useState(0);
    const [CountryofBirth, setCountryofBirth] = useState("Singapore");
    const [Smoking, setSmoking] = useState(0);
    const [Alcohol, setAlcohol] = useState(0);
    const [FamilyHistory, setFamilyHistory] = useState(0);
    const [CloseContact, setCloseContact] = useState(0);
    const [HealthConditions, setHealthConditions] = useState(0);
    const [OccupationalRisks, setOccupationalRisks] = useState(0);
    const [PhysicalActivity, setPhysicalActivity] = useState(0);
    const [Diet, setDiet] = useState(0);
    const [AirPollution, setAirPollution] = useState(0);
    const [LongTermCough, setLongTermCough] = useState(0);
    const [ChestPain, setChestPain] = useState(0);
    const [AppetiteLoss, setAppetiteLoss] = useState(0);
    const [WeightLoss, setWeightLoss] = useState(0);
    const [Chills, setChills] = useState(0);
    const [Fatigue, setFatigue] = useState(0);
    const [NightSweat, setNightSweat] = useState(0);
    const [CoughBlood, setCoughBlood] = useState(0);
    const [Fevers, setFevers] = useState(0);
    const [NitricOxide, setNitricOxide] = useState(0);

    const navigate = useNavigate();

    const uuid = auth.currentUser.uid;

    const addUserData = async (userdata) => {
        try {
            const docRef = doc(db, "users", uuid); // Create a reference to the document with the specified UUID
            await setDoc(docRef, userdata); // Set data for the specified document
            console.log("Document written with ID: ", uuid); // Log the UUID of the document
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
  


    const handleSubmit = async (e) => {
      e.preventDefault();  
      if (!Name || !Gender || !Age || !CountryofBirth) {
        // Handle error when required fields are not filled

        console.error("Please fill in all required fields.");
        alert("Please fill in all required fields.")
        return;
    }
        addUserData({
              Name: Name,
              Gender: Gender,    
              Age: Age,
              CountryofBirth: CountryofBirth,
              Smoking: Smoking,
              Alcohol: Alcohol,
              FamilyHistory: FamilyHistory,
              CloseContact: CloseContact,
              HealthConditions: HealthConditions,
              OccupationalRisks: OccupationalRisks,
              PhysicalActivity: PhysicalActivity,
              Diet: Diet,
              AirPollution: AirPollution,
              LongTermCough: LongTermCough,
              ChestPain: ChestPain,
              AppetiteLoss: AppetiteLoss,
              WeightLoss: WeightLoss,
              Chills: Chills,
              Fatigue: Fatigue,
              NightSweat: NightSweat,
              CoughBlood: CoughBlood,
              Fevers: Fevers,
              NitricOxide: NitricOxide
          });
          navigate("/instructions")
    }
  

    
 
    return (
        <section className="todo-container">
            <div className="todo">
                <h1 className="surveyheader">
                    Survey
                </h1>
                <div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Name: </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <input
                                className="surveyinputbox"
                                type="text"
                                placeholder="Enter your Name"
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Gender: </label>
                        </div>
                        <div className="surveyinputcontainner">
                        <select className="surveyinputbox" id="gender" name="gender" onChange={(e)=>setGender(e.target.value)}>
                            <option value="">Select Option</option>
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                        </div>
                    </div>
               
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Age: </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <input
                            className="surveyinputbox"
                                type="number"
                                placeholder="Enter your Age"
                                onChange={(e)=>setAge(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Country of Birth: </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="country" name="country" onChange={(e)=>setCountryofBirth(e.target.value)}>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Åland Islands">Åland Islands</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">Bouvet Island</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote D'ivoire">Cote D'ivoire</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Territories">French Southern Territories</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernsey">Guernsey</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-bissau">Guinea-bissau</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                <option value="Korea, Republic of">Korea, Republic of</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macao">Macao</option>
                                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                <option value="Moldova, Republic of">Moldova, Republic of</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montenegro">Montenegro</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russian Federation">Russian Federation</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Helena">Saint Helena</option>
                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore" selected>Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Timor-leste">Timor-leste</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Viet Nam">Viet Nam</option>
                                <option value="Virgin Islands, British">Virgin Islands, British</option>
                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                <option value="Wallis and Futuna">Wallis and Futuna</option>
                                <option value="Western Sahara">Western Sahara</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Smoking Frequency: </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="smoking" name="smoking" onChange={(e)=>setSmoking(e.target.value)}>
                                <option value="0" selected>0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Alocohol Consumption Frequency: </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="alcohol" name="alcohol" onChange={(e)=>setAlcohol(e.target.value)}>
                                <option value="0" selected>0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Family History: </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="familyhistory" name="familyhistory" onChange={(e)=>setFamilyHistory(e.target.value)}>
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Close Contact with TB: </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="closecontact" name="closecontact" onChange={(e)=>setCloseContact(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Do you have a health condition? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="healthconditions" name="healthconditions" onChange={(e)=>setHealthConditions(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Are you a service worker? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="occupationalrisks" name="occupationalrisks" onChange={(e)=>setOccupationalRisks(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Are you physically active? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="physicalactivity" name="physicalactivity" onChange={(e)=>setPhysicalActivity(e.target.value)}>
                                
                                <option value="0">0</option>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Are you on a diet? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="diet" name="diet" onChange={(e)=>setDiet(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Are you constantly exposed to air pollution? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="airpollution" name="airpollution" onChange={(e)=>setAirPollution(e.target.value)}>
                                
                                <option value="0">0</option>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Have you been coughing for the last 3 or more weeks? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="LongTermCough" name="LongTermCough" onChange={(e)=>setLongTermCough(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Do you feel chest pain? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="ChestPain" name="ChestPain" onChange={(e)=>setChestPain(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Do you have an appetite loss? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="AppetiteLoss" name="AppetiteLoss" onChange={(e)=>setAppetiteLoss(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Have you lost weight unintentionally? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="WeightLoss" name="WeightLoss" onChange={(e)=>setWeightLoss(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Do you get chills? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="Chills" name="Chills" onChange={(e)=>setChills(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>

                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Do you feel fatigued? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="Fatigue" name="Fatigue" onChange={(e)=>setFatigue(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Do you get night sweats? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="NightSweat" name="NightSweat" onChange={(e)=>setNightSweat(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Do you cough out blood? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="CoughBlood" name="CoughBlood" onChange={(e)=>setCoughBlood(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="surveycontainer">
                        <div className="surveylabelcontainer">
                            <label>Do you have fevers? </label>
                        </div>
                        <div className="surveyinputcontainner">
                            <select className="surveyinputbox" id="Fevers" name="Fevers" onChange={(e)=>setFevers(e.target.value)}>
                                
                                <option value="1">Yes</option>
                                <option value="0" selected>No</option>
                            </select>
                        </div>
                    </div>



                    <div className="surveybuttoncontainer">
                        <button
                            type="submit"
                            className="surveybutton"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
   
                </div>
            </div>
        </section>
    )
}
 
export default Survey