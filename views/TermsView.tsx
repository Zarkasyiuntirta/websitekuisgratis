import React from 'react';
import PolicyLayout from './PolicyLayout';

interface TermsViewProps {
  onBack: () => void;
}

const TermsView: React.FC<TermsViewProps> = ({ onBack }) => {
  return (
    <PolicyLayout title="Terms of Use" onBack={onBack}>
      <h4>Last updated: [Date]</h4>
      <p>Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the QuizWall application (the "Service") operated by us.</p>
      
      <h4>1. Acceptance of Terms</h4>
      <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
      
      <h4>2. Accounts</h4>
      <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
      <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
      
      <h4>3. Content</h4>
      <p>Our Service allows you to create, post, and share quizzes ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>
      <p>By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.</p>
      
      <h4>4. Prohibited Uses</h4>
      <p>You may use the Service only for lawful purposes and in accordance with the Terms. You agree not to use the Service:</p>
      <ul>
        <li>In any way that violates any applicable national or international law or regulation.</li>
        <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
        <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
      </ul>
      
      <h4>5. Termination</h4>
      <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      
      <h4>6. Governing Law</h4>
      <p>These Terms shall be governed and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>
      
      <h4>7. Changes</h4>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
      
      <h4>8. Contact Us</h4>
      <p>If you have any questions about these Terms, please contact us.</p>
    </PolicyLayout>
  );
};

export default TermsView;
