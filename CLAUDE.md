# EcoSynTech Sales Claw

Hệ thống tự động hóa bán hàng cho EcoSynTech Farm OS.

## Cấu trúc Claws

| Claw | File | Mô tả |
|------|------|-------|
| Lead | lead-claw.js | Tiếp nhận khách hàng, phân loại |
| Product | product-claw.js | Tư vấn sản phẩm phù hợp |
| Quote | quote-claw.js | Báo giá tự động |
| Contract | contract-claw.js | Tạo hợp đồng PDF |
| Install | install-claw.js | Hướng dẫn triển khai |
| Support | support-claw.js | Bảo hành, xử lý lỗi |

## Chạy test

```bash
node tests/run-all.js
```

## Luồng hoạt động

1. Khách hỏi → Lead Claw tiếp nhận
2. Lead chuyển → Product Claw tư vấn
3. Khách đồng ý → Quote Claw báo giá
4. Khách xác nhận → Contract Claw tạo hợp đồng
5. Sau bán → Install Claw hướng dẫn
6. Có vấn đề → Support Claw xử lý

## Tích hợp

- Discord Bot
- Website Chatbot
- API Endpoint