'use client';

import { useState } from 'react';

export function TestEditor() {
  const [text, setText] = useState('');

  return (
    <div>
      <div
        contentEditable
        onInput={(e) => {
          const content = e.currentTarget.textContent || '';
          console.log('Test Editor Input:', content);
          setText(content);
        }}
        style={{
          border: '1px solid black',
          padding: '10px',
          minHeight: '100px',
          direction: 'auto',
          textAlign: 'start',
        }}
        suppressContentEditableWarning
      />
      <p className="mt-4">
        محتوای ذخیره شده:{' '}
        <span className="font-mono bg-muted p-1 rounded-md">{text}</span>
      </p>
    </div>
  );
}
