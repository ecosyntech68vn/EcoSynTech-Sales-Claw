const claws = require('../src/claws');

console.log('🧪 EcoSynTech Sales Claw - Test Suite\n');
console.log('='.repeat(50));

async function testAll() {
  let passed = 0;
  let failed = 0;
  
  console.log('\n📋 Testing Lead Claw...');
  try {
    const leadResult = await claws.process('lead', {
      message: 'Tôi muốn mua hệ thống IoT cho trang trại rau 1000m2',
      customer: { source: 'website' }
    });
    console.log('  ✓ Lead Claw:', leadResult.lead.id);
    console.log('    Segment:', leadResult.lead.segment);
    console.log('    Intent:', leadResult.lead.intent);
    passed++;
  } catch (e) {
    console.log('  ✗ Lead Claw:', e.message);
    failed++;
  }
  
  console.log('\n📋 Testing Product Claw...');
  try {
    const productResult = await claws.process('product', {
      lead: { segment: 'agriculture', intent: 'inquiry' },
      farmSize: 1000,
      cropType: 'vegetables'
    });
    console.log('  ✓ Product Claw:', productResult.recommendations.length, 'packages');
    console.log('    Gói recommended:', productResult.recommendations[0].name);
    passed++;
  } catch (e) {
    console.log('  ✗ Product Claw:', e.message);
    failed++;
  }
  
  console.log('\n📋 Testing Quote Claw...');
  try {
    const quoteResult = await claws.process('quote', {
      packageId: 'standard',
      farmSize: 1000,
      cropType: 'vegetables',
      lead: {}
    });
    console.log('  ✓ Quote Claw:', quoteResult.quote.id);
    console.log('    Tổng giá:', quoteResult.quote.pricing.total);
    console.log('    ROI:', quoteResult.quote.roi.roi);
    passed++;
  } catch (e) {
    console.log('  ✗ Quote Claw:', e.message);
    failed++;
  }
  
  console.log('\n📋 Testing Contract Claw...');
  try {
    const sampleQuote = {
      package: { id: 'standard', name: 'Gói Tiêu chuẩn', sensors: 10 },
      pricing: { total: 9800000 }
    };
    const contractResult = await claws.process('contract', {
      quote: sampleQuote,
      customer: { name: 'Nguyễn Văn A', phone: '0912345678' },
      payment: '50-50'
    });
    console.log('  ✓ Contract Claw:', contractResult.contract.number);
    console.log('    Khách hàng:', contractResult.contract.customer.name);
    passed++;
  } catch (e) {
    console.log('  ✗ Contract Claw:', e.message);
    failed++;
  }
  
  console.log('\n📋 Testing Install Claw...');
  try {
    const installResult = await claws.process('install', {
      contract: { package: { id: 'standard' } }
    });
    console.log('  ✓ Install Claw:', installResult.guide.title);
    console.log('    Duration:', installResult.guide.duration);
    passed++;
  } catch (e) {
    console.log('  ✗ Install Claw:', e.message);
    failed++;
  }
  
  console.log('\n📋 Testing Support Claw...');
  try {
    const supportResult = await claws.process('support', {
      issue: 'Cảm biến không hoạt động',
      customer: { name: 'Nguyễn Văn A' },
      contract: {}
    });
    console.log('  ✓ Support Claw:', supportResult.ticket.id);
    console.log('    Issue:', supportResult.diagnosis.type);
    console.log('    Solution:', supportResult.solution.title);
    passed++;
  } catch (e) {
    console.log('  ✗ Support Claw:', e.message);
    failed++;
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Kết quả: ${passed} passed, ${failed} failed`);
  if (passed === 6) {
    console.log('✓ Tất cả Claws hoạt động!');
  }
}

testAll();