import React from 'react';
import PolicyLayout from './PolicyLayout';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
  return (
    <PolicyLayout title="Privacy Policy" onBack={onBack}>
      <h4>Last updated: [Date]</h4>
      <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our QuizWall application (the "Service") and the choices you have associated with that data.</p>
      
      <h4>1. Information Collection and Use</h4>
      <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
      <h5>Personal Data</h5>
      <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
      <ul>
        <li>Email address</li>
        <li>Password (stored in a hashed format)</li>
      </ul>

      <h4>2. Use of Data</h4>
      <p>We use the collected data for various purposes:</p>
      <ul>
        <li>To provide and maintain our Service</li>
        <li>To notify you about changes to our Service</li>
        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
        <li>To provide customer support</li>
        <li>To monitor the usage of our Service</li>
        <li>To detect, prevent and address technical issues</li>
      </ul>

      <h4>3. Security of Data</h4>
      <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

      <h4>4. Service Providers</h4>
      <p>We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

      <h4>5. Children's Privacy</h4>
      <p>Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

      <h4>6. Changes to This Privacy Policy</h4>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

      <h4>7. Contact Us</h4>
      <p>If you have any questions about this Privacy Policy, please contact us.</p>
    </PolicyLayout>
  );
};

export default PrivacyPolicyView;
