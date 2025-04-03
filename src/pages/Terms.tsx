
import React from 'react';
import Layout from '@/components/layout/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-gray-500 mb-8">Last Updated: June 1, 2023</p>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Welcome to CozyNest. These Terms & Conditions ("Terms") govern your use of our website and services. By accessing our website or making a purchase, you agree to these Terms.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. General Terms</h2>
            
            <p>
              By accessing and using our website, you agree to comply with these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use our website.
            </p>
            
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of the website after any changes constitutes acceptance of the modified Terms.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">2. Products and Pricing</h2>
            
            <p>
              All products are subject to availability. We reserve the right to discontinue any product at any time.
            </p>
            
            <p>
              Prices for products are subject to change without notice. We do our best to ensure all pricing information is accurate, but errors may occur. If we discover an error in the price of products you have ordered, we will inform you as soon as possible and give you the option of reconfirming your order at the correct price or canceling it.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">3. Orders and Payment</h2>
            
            <p>
              When you place an order, you are making an offer to purchase. We reserve the right to accept or decline your order for any reason.
            </p>
            
            <p>
              Payment must be made at the time of ordering. We accept various payment methods as indicated on our website. All payment information is securely processed.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">4. Shipping and Delivery</h2>
            
            <p>
              Shipping costs and estimated delivery times are provided during the checkout process. We are not responsible for delays due to customs, natural disasters, or other events beyond our control.
            </p>
            
            <p>
              Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">5. Returns and Refunds</h2>
            
            <p>
              We offer a 30-day return policy for most items. Products must be in original condition with all packaging. Certain items, such as personalized products or clearance items, may not be eligible for return.
            </p>
            
            <p>
              To initiate a return, please contact our customer service team. Refunds will be issued to the original payment method, typically within 10-14 business days after we receive the returned item.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">6. User Accounts</h2>
            
            <p>
              When you create an account, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
            
            <p>
              We reserve the right to terminate accounts, cancel orders, or refuse service to anyone for any reason at any time.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            
            <p>
              All content on our website, including text, graphics, logos, images, and software, is the property of CozyNest or its content suppliers and is protected by international copyright laws.
            </p>
            
            <p>
              You may not reproduce, distribute, modify, display, perform, or use any materials on our website without our prior written consent.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">8. Product Warranties</h2>
            
            <p>
              We provide a 2-year warranty on most products against defects in materials and workmanship. This warranty does not cover damage from misuse, accidents, or normal wear and tear.
            </p>
            
            <p>
              To make a warranty claim, please contact our customer service team with your order number and details about the issue.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
            
            <p>
              CozyNest shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our website or products.
            </p>
            
            <p>
              In no event shall our total liability to you for all damages exceed the amount paid by you for the products in question.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">10. Governing Law</h2>
            
            <p>
              These Terms shall be governed by and construed in accordance with the laws of California, without regard to its conflict of law provisions.
            </p>
            
            <p>
              Any dispute arising from these Terms shall be resolved exclusively in the state or federal courts located in San Francisco, California.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">11. Contact Information</h2>
            
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            
            <p className="mt-4">
              <strong>CozyNest</strong><br />
              1234 Market Street<br />
              San Francisco, CA 94103<br />
              United States<br />
              <br />
              Email: legal@cozynest.com<br />
              Phone: +1 (415) 555-0123
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
