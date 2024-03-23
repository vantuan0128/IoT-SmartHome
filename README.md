API docs: [https://documenter.getpostman.com/view/27112600/](https://documenter.getpostman.com/view/27112600/2sA35Baj5U)

Để đảm bảo ứng dụng hoạt động một cách đúng đắn:
- Chắc chắn rằng bạn đã cài mqtt broker
- Cần đảm bảo phía software và hardware đã kết nối mqtt server thành công (IP address, port, username, password)
- Cần đảm bảo phía software và hardware thực hiện sub và pub lên các topic hợp lệ
Để chạy ứng dụng cần:
- Vào thư mục software và run project bằng lệnh
  ```
  npm start
  ```
- Khởi động server bằng cách chạy file server.js
  ```
  node server.js
  ```
- Khởi động MQTT Broker bằng lệnh
  ```
  Windows + R --> cmd
  ```
  Vào đúng thư mục chứa mosquitto đã cài đặt:
  ```
  cd C:\Program Files\mosquitto
  ```
  Sau đó chạy lệnh
  ```
  "net start mosquitto" hoặc ".\mosquitto.exe -v -c mosquitto.conf"
  ```
