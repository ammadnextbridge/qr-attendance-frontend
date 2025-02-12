
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-12 text-gray-800 border-b pb-4">
        Shapes Fitness Privacy Policy
      </h1>
      
      <section className="mb-12 hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Data Collection and Usage</h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          At Shapes Fitness, we are committed to protecting your privacy and ensuring the security of your personal information. Our app collects and processes only the data necessary to provide you with our fitness services.
        </p>
        <ul className="list-disc pl-8 space-y-3 text-gray-600">
          <li>Your content is used exclusively for providing fitness-related services</li>
          <li>Camera access is primarily used for QR code scanning for attendance tracking</li>
          <li>We don't collect any personal data from the user in the app</li>
        </ul>
      </section>

      <section className="mb-12 hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Data Protection and Security</h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          We implement reasonable security measures to protect your information and comply with applicable privacy laws. Your confidential information is handled with utmost care and is only shared in specific circumstances:
        </p>
        <ul className="list-disc pl-8 space-y-3 text-gray-600">
          <li>In response to valid legal requests (search warrants, court orders, or subpoenas)</li>
          <li>When required by law or to prevent harm</li>
          <li>With notice to you, unless prohibited by law</li>
        </ul>
      </section>

      <section className="mb-12 hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Data Retention</h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          We may retain your information for an extended period when:
        </p>
        <ul className="list-disc pl-8 space-y-3 text-gray-600">
          <li>Subject to legal obligations or governmental investigations</li>
          <li>Required for investigation of potential policy violations</li>
          <li>Necessary to prevent harm or maintain service integrity</li>
        </ul>
      </section>

      <section className="mb-12 hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Disclaimer of Warranty</h2>
        <p className="text-gray-600 leading-relaxed">
          The Shapes Fitness App is provided "as is" without warranties of any kind, either expressed or implied. This includes, but is not limited to, warranties of merchantability, satisfactory quality, title, noninfringement, or fitness for a particular purpose. We do not guarantee uninterrupted or error-free operation.
        </p>
      </section>

      <section className="mb-12 hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Limitation of Liability</h2>
        <p className="text-gray-600 leading-relaxed">
          To the maximum extent permitted by law, Shapes Fitness and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use our services. This includes, but is not limited to, personal injury, loss of data, loss of profits, business interruption, or system failures.
        </p>
      </section>

      <footer className="text-sm text-gray-500 border-t pt-4">
        <p>Last updated: February 2025</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;