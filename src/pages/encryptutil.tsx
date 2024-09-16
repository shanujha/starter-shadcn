// src/components/EncryptionComponent.tsx
import React, { useState } from 'react';
import EncryptionUtil from '@/lib/encryption';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const EncryptionComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [encrypted, setEncrypted] = useState<string>('');
  const [decrypted, setDecrypted] = useState<string>('');

  const handleEncrypt = () => {
    const encryptedData = EncryptionUtil.encrypt(input);
    setEncrypted(encryptedData);
  };
  const handleDecrypt = () => {
    console.log('inside decrypt', encrypted)
    const decryptedData = EncryptionUtil.decrypt(encrypted);
    setDecrypted(decryptedData);
  };
  return (
    <div>
      <h2>Encryption Utility</h2>
      <div>
        <label>
          Input:
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
      </div>
      <Button onClick={handleEncrypt}>Encrypt</Button>
      <div>
        <label>
          Encrypted:
          <Textarea value={encrypted} onChange={(e) => setEncrypted(e.target.value)}/>
        </label>
      </div>
      <Button onClick={handleDecrypt}>Decrypt</Button>
      <div>
        <label>
          Decrypted:
          <Textarea value={decrypted} onChange={(e) => setDecrypted(e.target.value)}/>
        </label>
      </div>
    </div>
  );
};

export default EncryptionComponent;
