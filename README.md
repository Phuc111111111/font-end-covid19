# frontend-ui

Đây là dự án về thông kê các ca nhiễm covid và cách để người dân khác phục tính trạng nhiễm và tình trạng sức khỏe, qua đó sẽ giúp người dân cải thiện sức khỏe nhờ thông tin và sự hỗ trợ của các bác sĩ của trang web.

DỰ ÁN quản lý về covid

-gồm 3 loại người dùng : ADMIN, USER, DOCTER

- đăng nhập để login hệ thống sử dụng JWT.

- hiển thị biểu đồ theo các tháng, năm, của ca nhiễm.
  
- hiển thị danh sách bác sĩ.

- nhắn tin với bác sĩ.(socket.io)

CHỨC NĂNG HỆ THỐNG ADMIN

- quản lý thông tin về các ca nhiễm (CRUD)

- thêm sửa xóa số lượng các ca nhiễm theo ngày.

- phân trang, xắp xếp,

QUẢN LÝ THÔNG TIN VỀ CÁC BÀI VIẾT COVID,

- thêm sửa xóa các bài viết và update hình ảnh,

- xắp xếp, tìm kiếm , phân trang.

Quản lý Thông tin NGƯỜI DÙNG

-Thêm sửa xóa thông tin của doctor và user, thiết lập trạng thái của người dùng,
-tìm kiếm , phân trang

CHỨC NĂNG NGƯỜI DÙNG

- xem các bài viết, xem biểu đồ về các ca nhiễm theo tháng, xem danh sách các bác sĩ.

- nhắn tin với bác sĩ.

CHỨC NĂNG CỦA BÁC SĨ

-xem và trả lời tin nhắn chờ của bệnh nhân
