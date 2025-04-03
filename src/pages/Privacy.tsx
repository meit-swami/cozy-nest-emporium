
import React from 'react';
import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: June 1, 2023</p>
          
          <div className="prose prose-lg max-w-none">
            <p>
              At CozyNest, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-lg font-bold mt-6 mb-2">Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Register an account with us</li>
              <li>Place an order through our website</li>
              <li>Sign up for our newsletter</li>
              <li>Participate in promotions or surveys</li>
              <li>Contact us with inquiries or feedback</li>
            </ul>
            <p>
              This information may include your name, email address, postal address, phone number, payment information, and any other information you choose to provide.
            </p>
            
            <h3 className="text-lg font-bold mt-6 mb-2">Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website addresses</li>
            </ul>
            <p>
              We may also use cookies, web beacons, and similar tracking technologies to collect information about your browsing behavior.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            
            <p>We may use the information we collect for various purposes, including:</p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Processing and fulfilling your orders</li>
              <li>Creating and maintaining your account</li>
              <li>Providing customer service and support</li>
              <li>Sending transactional emails (order confirmations, shipping updates)</li>
              <li>Sending marketing communications (if you've opted in)</li>
              <li>Improving our website and product offerings</li>
              <li>Conducting research and analysis</li>
              <li>Preventing fraudulent transactions and monitoring against theft</li>
              <li>Complying with legal obligations</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Sharing Your Information</h2>
            
            <p>We may share your information with:</p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who help us operate our business (payment processors, shipping companies, etc.)</li>
              <li>Marketing partners (with your consent)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners in the event of a merger, acquisition, or asset sale</li>
            </ul>
            
            <p>
              We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Your Rights and Choices</h2>
            
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Accessing, correcting, or deleting your personal information</li>
              <li>Withdrawing your consent to our processing of your information</li>
              <li>Requesting that we limit our use of your personal information</li>
              <li>Requesting a copy of your personal information in a structured, machine-readable format</li>
              <li>Opting out of marketing communications</li>
            </ul>
            
            <p>
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Security</h2>
            
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Children's Privacy</h2>
            
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we might have collected information from a child under 13, please contact us.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Contact Us</h2>
            
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            
            <p className="mt-4">
              <strong>CozyNest</strong><br />
              1234 Market Street<br />
              San Francisco, CA 94103<br />
              United States<br />
              <br />
              Email: privacy@cozynest.com<br />
              Phone: +1 (415) 555-0123
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
