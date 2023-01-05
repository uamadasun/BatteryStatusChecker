const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);

//Batery API
const battery = () => {
  //navigator is a global method
  if('getBattery' in navigator) {
    navigator.getBattery()
      .then((battery) => {
        function updateAllBatteryDetails() {
          updateChargingInfo();
          updateLevelChange();
          updateDischargingTimeInfo();
          updateChargingTimeChangeInfo();
        };

        updateAllBatteryDetails();
        
        //--------------
        //battery charging change
        //--------------

        battery.addEventListener('chargingchange', () => {
          updateChargingInfo();
        });

        function updateChargingInfo() {
          const isCharging = battery.charging ? 'Yes':'No';
          batteryCharging.innerHTML = isCharging;
        }


        //--------------
        //battery charging time
        //--------------
        battery.addEventListener('chargingtimechange', () => {
          console.log('charging time has changed');
          updateChargingTimeChangeInfo();
        })

        function updateChargingTimeChangeInfo() {
          batteryChargingTime.innerHTML = battery.chargingTime + ` seconds`;
        }


        //--------------
        //battery discharging time
        //--------------
        battery.addEventListener('dischargingtimechange', () => {
          updateDischargingTimeInfo();
        })
        function updateDischargingTimeInfo() {
          batteryDisChargingTime.innerHTML = battery.dischargingTime + ` seconds`;
        }


        //--------------
        //battery level change
        //--------------
        battery.addEventListener('levelchange', () => {
          updateLevelChange();

        })

        function updateLevelChange() {
          const level = `${battery.level * 100}%`
          if(battery.level < 0.5) {
            batteryLevel.innerHTML = `Low Battery (less than 50%)`;
          } else{
            batteryLevel.innerHTML = level;
          }
        }

    })

  }
};

battery();
