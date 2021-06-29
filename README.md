# living-mobile-assignment

# Group Name : Sinovac
Backoffice Assignment
- Store: Fluke
- Category: Big
- Menu: Bom
# เกณท์ในการแบ่งงาน
# Fluke
- การแบ่งงานของทั้งสามคนจะเป็นการกระจายหนึ่งคนต่อหนึ่ง Componant โดยจะได้รับผิดชอบงานทั้งทางฝั่งการทำ UI และการจัดการ API ไปยัง Database โดยเนื้อหาการรับผิดชอบจะมีความคล้ายคลึงกัน มีแตกต่างกันบ้างตามรูปแบบของข้อมูล
- โดยหน้า Store จะมีการจัดการ API ทั้ง CRUD ในการเรียกข้อมูลมาแสดง แก้ไขข้อมูลเดิม เพิ่มข้อมูลใหม่ ลบข้อมูล การคัดลอกข้อมูล รวมไปถึงการเตรียมข้อมูลใส่ใน vuex สำหรับการใช้ใน componant อื่นๆ
# Big
- ในหน้า category เนื่องจากหน้านี้มีการใช้ข้อมูล 2 ตาราง คือ store กับ category ซึ่งต้องใช้ storeId จาก category ในการไปหาชื่อ store ใน store เพื่อให้แสดงชื่อ store ในหน้า category
- ในกรณีที่มีการลบ store จะทำให้ข้อมูล storeId ใน category นั้นเป็น null ทำให้เกิด error ได้ ซึ่งได้ทำการ handle โดยให้ในหน้า category ที่แสดงชื่อ store ที่ category ผูกไว้ให้แสดงว่า store ถูกลบไปแล้ว
- มีการใช้ vuex ในการเก็บ state และจัดการ api ของทั้ง store และ category
# Bom
- หน้า Menu มีการใช้ข้อมูล 2 ตาราง คือ category กับ menu ซึ่งจะคล้ายๆ หน้า category แต่มีการแยก component ออกมาคือ Form component และ Edit form component ซึ่งมีการเรียกใช้ทั้ง 2 ในหน้า Menu
- เนื่องจากปัญหาการเชื่อมต่อ back-end นี้ทำให้ต้องให้ `Big` ช่วยในการ Refactor code ให้เข้ากับ Backend แต่ก็ได้มี การเตรียมยิง api ไว้แล้วใน code

# Create DB
- cd db/
- docker-compose up -d
- go to localhost:5050
- Create server
- Hostname: `postgres`
- Port: `5432`
- Username: `postgres`
- Password: `secret`
