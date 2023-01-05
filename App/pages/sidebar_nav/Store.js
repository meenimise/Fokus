import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '../index';
import Header from '../../components/Header';
import StoreItem from '../../components/Store/StoreItem';

function Store() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return(
        <div></div>
    )
  }

  const storeItems = [
    {
      id: 1,
      name: "MoMo",
      avatar: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--7126fd576fa6d29ed40a1446cd47c2a6d6bce46b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--492f60b9aac6e8159e50e72bb289c5feb47a79d4/MoMoLogo.png",
      caption: "Đón năm an lành, trả nhanh dư nợ thẻ tín dụng và nhận quà 50.000đ trên MoMo. Mừng một năm mới sang trang, MoMo tặng bạn mã “CARD50” để nhận thêm ưu đãi hoàn tiền đến 50.000đ khi lần đầu thanh toán dư nợ thẻ tín dụng. Nhanh tay nhập mã ngay!",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672898400
      },
      img: "https://static.mservice.io/blogscontents/momo-upload-api-230104143646-638084398068709228.jpg",
      points: 500,
      itemsLeft: 10
    },
    {
      id: 2,
      name: "MoMo",
      avatar: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--7126fd576fa6d29ed40a1446cd47c2a6d6bce46b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--492f60b9aac6e8159e50e72bb289c5feb47a79d4/MoMoLogo.png",
      caption: "Mini App KFC trên MoMo - Tiệc gà xuyên Tết - giảm 50.000Đ tới bến cho hóa đơn từ 150.000Đ. Tết sắp đến rồi! Cùng MoMo mở tiệc gà linh đình ngay tại nhà vừa ngon vừa tiết kiệm liền thôi. Đặt món yêu thích trên Mini App KFC hưởng deal siêu xịn giảm liền 50.000Đ cho hóa đơn từ 150.000Đ. Đừng bỏ lỡ, MoMo ngay!",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672894800
      },
      img: "https://static.mservice.io/blogscontents/momo-upload-api-221226165245-638076703656123183.jpg",
      points: 600,
      itemsLeft: 20
    },
    {
      id: 3,
      name: "MoMo",
      avatar: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--7126fd576fa6d29ed40a1446cd47c2a6d6bce46b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--492f60b9aac6e8159e50e72bb289c5feb47a79d4/MoMoLogo.png",
      caption: "Ví Trả Sau nổ deal tưng bừng, hoàn tiền mừng Tết đến 50.000đ. Đón Tết lớn, Ví Trả Sau khao lớn: Tặng thẻ quà hoàn tiền đến 50.000đ cho hàng triệu người dùng. Áp dụng với mọi hoá đơn thanh toán, ăn uống, mua sắm. Kiểm tra thẻ quà của bạn và dùng ngay!",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672880400
      },
      img: "https://static.mservice.io/blogscontents/momo-upload-api-221229153920-638079251604778361.jpg",
      points: 700,
      itemsLeft: 30
    },
    {
      id: 4,
      name: "Zalo Pay",
      avatar: "https://play-lh.googleusercontent.com/gC9aHkRpVbz3QRSU-oTp8TFffwWucm7edvUCANReHEvK88MByol_5W33NGr0-t9BZhk=w480-h960-rw",
      caption: "MỞ TÀI KHOẢN SACOMBANK MIỄN PHÍ - TIỆN LỢI KHI DÙNG VÍ. Bạn chưa có tài khoản ngân hàng? Tin vui cho bạn đây. Từ nay tất cả khách hàng chưa có tài khoản Sacombank và đang sử dụng ví ZaloPay đều có thể chủ động mở tài khoản thanh toán Sacombank với số đẹp tự chọn ngay trên ví ZaloPay mà không cần trực tiếp đến Ngân hàng, hoàn toàn không mất phí, tiện lợi khi dùng ví",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672826400
      },
      img: "https://simg.zalopay.com.vn/zlp-website/assets/Sacombank_Mo_the_July_750x440_c64d4710f1.jpg",
      points: 800,
      itemsLeft: 40
    },
    {
      id: 5,
      name: "Zalo Pay",
      avatar: "https://play-lh.googleusercontent.com/gC9aHkRpVbz3QRSU-oTp8TFffwWucm7edvUCANReHEvK88MByol_5W33NGr0-t9BZhk=w480-h960-rw",
      caption: "Nạp tiền điện thoại, data – Trúng vé máy bay về nhà ăn Tết. Bạn đã biết tin gì chưa? Chỉ cần Mua mã thẻ/Nạp điện thoại/ Data 3G4G, Combo/Trả sau trên ZaloPay chỉ từ 10K là bạn chắc chắn sẽ nhận được thẻ GIẢM 100k mua vé máy bay và còn có cơ hội là khách hàng may mắn trở thành chủ nhân cặp vé máy bay khứ hồi trị giá 10 TRIỆU ĐỒNG.",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672833600
      },
      img: "https://simg.zalopay.com.vn/zlp-website/assets/Napdata_Tet_720x360_1_2b6b507ebd.jpg",
      points: 900,
      itemsLeft: 50
    },
    {
      id: 6,
      name: "Tiki",
      avatar: "https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png",
      caption: "[2 năm] Bảo hiểm bắt buộc trách nhiệm dân sự xe máy PVI Trên 50cc 2 năm. Truy cập đường link đăng ký: https://ezin.vn  nhận Seri/Code [12 số seri]/[8 số mã số bí mật]. Ví dụ: 1234 1234 1234/1234 1234. và kích hoạt gói bảo hiểm.",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672837200
      },
      img: "https://salt.tikicdn.com/cache/750x750/ts/product/01/9d/02/503f904a707ccba4e3da676fa0e34747.jpg",
      points: 1000,
      itemsLeft: 60
    },
    {
      id: 7,
      name: "Tiki",
      avatar: "https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png",
      caption: "Toàn quốc-[Evoucher] Gói học Toán trên VioEdu. Mua gói 12 tháng môn Toán bạn sẽ được học môn Toán với thời hạn 12 tháng tính từ thời điển kích hoạt mã. Trường hợp tài khoản học vẫn còn thời hạn học, khi kích hoạt thêm mã thì thời gian học sẽ được cộng thêm tương ứng. Giá gói mua sẽ thay đổi tùy theo chính sách ưu đãi của từng tháng. Nhớ follow VioEdu để không bỏ lỡ các chương trình hấp dẫn.",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672844400
      },
      img: "https://salt.tikicdn.com/cache/750x750/ts/product/91/67/a8/0c686bc04b6212b922488348e2753731.jpg",
      points: 1300,
      itemsLeft: 70
    },
    {
      id: 8,
      name: "MoMo",
      avatar: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--7126fd576fa6d29ed40a1446cd47c2a6d6bce46b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--492f60b9aac6e8159e50e72bb289c5feb47a79d4/MoMoLogo.png",
      caption: "Đón năm an lành, trả nhanh dư nợ thẻ tín dụng và nhận quà 50.000đ trên MoMo. Mừng một năm mới sang trang, MoMo tặng bạn mã “CARD50” để nhận thêm ưu đãi hoàn tiền đến 50.000đ khi lần đầu thanh toán dư nợ thẻ tín dụng. Nhanh tay nhập mã ngay!",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672898400
      },
      img: "https://static.mservice.io/blogscontents/momo-upload-api-230104143646-638084398068709228.jpg",
      points: 500,
      itemsLeft: 10
    },
    {
      id: 9,
      name: "MoMo",
      avatar: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--7126fd576fa6d29ed40a1446cd47c2a6d6bce46b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--492f60b9aac6e8159e50e72bb289c5feb47a79d4/MoMoLogo.png",
      caption: "Mini App KFC trên MoMo - Tiệc gà xuyên Tết - giảm 50.000Đ tới bến cho hóa đơn từ 150.000Đ. Tết sắp đến rồi! Cùng MoMo mở tiệc gà linh đình ngay tại nhà vừa ngon vừa tiết kiệm liền thôi. Đặt món yêu thích trên Mini App KFC hưởng deal siêu xịn giảm liền 50.000Đ cho hóa đơn từ 150.000Đ. Đừng bỏ lỡ, MoMo ngay!",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672894800
      },
      img: "https://static.mservice.io/blogscontents/momo-upload-api-221226165245-638076703656123183.jpg",
      points: 600,
      itemsLeft: 20
    },
    {
      id: 10,
      name: "MoMo",
      avatar: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--7126fd576fa6d29ed40a1446cd47c2a6d6bce46b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--492f60b9aac6e8159e50e72bb289c5feb47a79d4/MoMoLogo.png",
      caption: "Ví Trả Sau nổ deal tưng bừng, hoàn tiền mừng Tết đến 50.000đ. Đón Tết lớn, Ví Trả Sau khao lớn: Tặng thẻ quà hoàn tiền đến 50.000đ cho hàng triệu người dùng. Áp dụng với mọi hoá đơn thanh toán, ăn uống, mua sắm. Kiểm tra thẻ quà của bạn và dùng ngay!",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672880400
      },
      img: "https://static.mservice.io/blogscontents/momo-upload-api-221229153920-638079251604778361.jpg",
      points: 700,
      itemsLeft: 30
    },
    {
      id: 11,
      name: "Zalo Pay",
      avatar: "https://play-lh.googleusercontent.com/gC9aHkRpVbz3QRSU-oTp8TFffwWucm7edvUCANReHEvK88MByol_5W33NGr0-t9BZhk=w480-h960-rw",
      caption: "MỞ TÀI KHOẢN SACOMBANK MIỄN PHÍ - TIỆN LỢI KHI DÙNG VÍ. Bạn chưa có tài khoản ngân hàng? Tin vui cho bạn đây. Từ nay tất cả khách hàng chưa có tài khoản Sacombank và đang sử dụng ví ZaloPay đều có thể chủ động mở tài khoản thanh toán Sacombank với số đẹp tự chọn ngay trên ví ZaloPay mà không cần trực tiếp đến Ngân hàng, hoàn toàn không mất phí, tiện lợi khi dùng ví",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672826400
      },
      img: "https://simg.zalopay.com.vn/zlp-website/assets/Sacombank_Mo_the_July_750x440_c64d4710f1.jpg",
      points: 800,
      itemsLeft: 40
    },
    {
      id: 12,
      name: "Zalo Pay",
      avatar: "https://play-lh.googleusercontent.com/gC9aHkRpVbz3QRSU-oTp8TFffwWucm7edvUCANReHEvK88MByol_5W33NGr0-t9BZhk=w480-h960-rw",
      caption: "Nạp tiền điện thoại, data – Trúng vé máy bay về nhà ăn Tết. Bạn đã biết tin gì chưa? Chỉ cần Mua mã thẻ/Nạp điện thoại/ Data 3G4G, Combo/Trả sau trên ZaloPay chỉ từ 10K là bạn chắc chắn sẽ nhận được thẻ GIẢM 100k mua vé máy bay và còn có cơ hội là khách hàng may mắn trở thành chủ nhân cặp vé máy bay khứ hồi trị giá 10 TRIỆU ĐỒNG.",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672833600
      },
      img: "https://simg.zalopay.com.vn/zlp-website/assets/Napdata_Tet_720x360_1_2b6b507ebd.jpg",
      points: 900,
      itemsLeft: 50
    },
    {
      id: 13,
      name: "Tiki",
      avatar: "https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png",
      caption: "[2 năm] Bảo hiểm bắt buộc trách nhiệm dân sự xe máy PVI Trên 50cc 2 năm. Truy cập đường link đăng ký: https://ezin.vn  nhận Seri/Code [12 số seri]/[8 số mã số bí mật]. Ví dụ: 1234 1234 1234/1234 1234. và kích hoạt gói bảo hiểm.",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672837200
      },
      img: "https://salt.tikicdn.com/cache/750x750/ts/product/01/9d/02/503f904a707ccba4e3da676fa0e34747.jpg",
      points: 1000,
      itemsLeft: 60
    },
    {
      id: 14,
      name: "Tiki",
      avatar: "https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png",
      caption: "Toàn quốc-[Evoucher] Gói học Toán trên VioEdu. Mua gói 12 tháng môn Toán bạn sẽ được học môn Toán với thời hạn 12 tháng tính từ thời điển kích hoạt mã. Trường hợp tài khoản học vẫn còn thời hạn học, khi kích hoạt thêm mã thì thời gian học sẽ được cộng thêm tương ứng. Giá gói mua sẽ thay đổi tùy theo chính sách ưu đãi của từng tháng. Nhớ follow VioEdu để không bỏ lỡ các chương trình hấp dẫn.",
      timestamp: {
        nanoseconds: 0,
        seconds: 1672844400
      },
      img: "https://salt.tikicdn.com/cache/750x750/ts/product/91/67/a8/0c686bc04b6212b922488348e2753731.jpg",
      points: 1300,
      itemsLeft: 70
    }              
  ];

  if (status === "authenticated") {
    return (
      <Sidebar>
        <Header headerText={'Fokus Store 🛍️'}>
        </Header>
        
        <div className='relative h-[460px] w-full items-center justify-center overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-grey scrollbar-track-grey_message scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          {storeItems.sort((a, b) => parseFloat(b.timestamp.seconds) - parseFloat(a.timestamp.seconds)).map((item) => (
            <StoreItem
              key={item.id}
              id={item.id}
              name={item.name}
              avatar={item.avatar}
              img={item.img}
              caption={item.caption}
              timestamp={item.timestamp}
              points={item.points}
              itemsLeft={item.itemsLeft}
            />
          ))}
        </div>
      </Sidebar>
    )
  }

  return(
    <Home></Home>
  )
}

export default Store