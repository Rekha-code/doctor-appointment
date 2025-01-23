import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { backendUrl, dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.error(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <>
        <div>
          <div className="flex flex-col gap-4 m-5">
            <div>
              <img
                className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
                src={profileData.image}
                alt=""
              />
            </div>
            <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
              {/* Doc Info Name,degree,experience */}
              <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                {profileData.name}
              </p>
              <div className="flex items-center gap-2 mt-1text-gray-600">
                <p>
                  {profileData.degree} - {profileData.speciality}
                </p>
                <div>
                  <button className="py-0.5 px-2 border text-xs rounded-full ">
                    {profileData.experience}
                  </button>
                </div>
                {/* Doc about */}
                <div>
                  <div>
                    <p className="flex items-center gap-1 text-sm font-medium text text-neutral-800 mt-3">
                      About:
                    </p>
                    <p>{profileData.about}</p>
                  </div>
                  <p>
                    Appointment fee:
                    <span>
                      {currency}
                      {isEdit ? (
                        <input
                          type="number"
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              fees: e.target.value,
                            }))
                          }
                          value={profileData.fees}
                        />
                      ) : (
                        profileData.fees
                      )}
                    </span>
                  </p>
                  <div>
                    <p>Address:</p>
                    <p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line1: e.target.value,
                              },
                            }))
                          }
                          value={profileData.address.line1}
                        />
                      ) : (
                        profileData.address.line1
                      )}
                      <br />
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line2: e.target.value,
                              },
                            }))
                          }
                          value={profileData.address.line2}
                        />
                      ) : (
                        profileData.address.line2
                      )}
                    </p>
                  </div>
                  <div>
                    <input
                      onChange={(e) =>
                        isEdit &&
                        setProfileData((prev) => ({
                          ...prev,
                          available: !prev.available,
                        }))
                      }
                      checked={profileData.available}
                      type="checkbox"
                      id=""
                    />
                    <label htmlFor="">Available</label>
                  </div>

                  {isEdit ? (
                    <button
                      onClick={updateProfile}
                      className="px-4 py-1 border border-primary rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEdit(true)}
                      className="px-4 py-1 border border-primary rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default DoctorProfile;
