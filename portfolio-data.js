/* Add projects here. No build tool or framework required.
   category becomes a filter automatically. href is optional; never invent a URL.
   Full pre-redesign case studies are preserved, byte for byte, at engineering.html.
   Reference readings below are transcribed from the supplied laser monitor image.
   X = invalid; null = no sample. These are NOT live telemetry or tolerance rules. */
window.PORTFOLIO = {
  projects: [
    { title: 'NeuroCam Trainer', category: 'Industrial AI', icon: '⌘', description: 'The model-building companion to VisionPLC: capture, annotate, train, benchmark and export in one desktop workflow.', tags: ['PyQt6', 'YOLO', 'ONNX / TensorRT'], href: 'engineering.html' },
    { title: 'The GPU slowdown', category: 'Engineering', icon: '↯', description: 'A production regression traced through the logs to GPU power states. Measured keep-alive inference brought one camera from 131.6 ms to 22.1 ms.', tags: ['Profiling', 'Root-cause analysis'], href: 'engineering.html#gpu' },
    { title: 'Robotic stacking recovery', category: 'Engineering', icon: '⌁', description: 'Reverse-engineering ABB RAPID logic and matching sensor feedback to the physical behaviour of a timber stacking line.', tags: ['ABB RAPID', 'Sensors', 'Commissioning'], href: 'engineering.html' },
    { title: 'LoreForge', category: 'Products & tools', icon: '◇', description: 'An AI game-asset tool with model APIs, agent tool calling and 3D generation. Built with an indie game production team using the beta.', tags: ['MCP', 'Generative AI', '3D assets'] },
    { title: 'Slim', category: 'Products & tools', icon: '↙', description: 'A native iOS app for on-device photo and video compression. No uploads, no account; original files stay under the user’s control.', tags: ['Swift', 'AVFoundation', 'iOS'], href: 'https://apps.apple.com/au/app/slim-photo-video-compress/id6778816811' },
    { title: 'Documentation assistant', category: 'Products & tools', icon: '{ }', description: 'A retrieval-augmented assistant that turns internal technical documentation into a searchable, plain-language resource for staff.', tags: ['RAG', 'SQL Server', 'LLM APIs'] },
    { title: 'Virtual fencing & path planning', category: 'Engineering', icon: '⌗', description: 'A Unity and Python simulation of work boundaries, exclusion zones and coverage planning for multiple machines.', tags: ['Unity', 'Python', 'Simulation'] },
    { title: 'LLM staff trainer', category: 'Products & tools', icon: '↔', description: 'An internal training assistant used by new starters at a restaurant chain, designed around where language models help the workflow.', tags: ['LLMs', 'Training', 'Prompt design'] },
    { title: 'Custom annotation app', category: 'Industrial AI', icon: '⊞', description: 'Frame extraction, box, polygon and OCR labelling, with training export shaped around the production data rather than a generic workflow.', tags: ['Python', 'Data tooling', 'OCR'] }
  ],
  measurement: {
    '2.4': [5,5,0,3,4,3,0,4,1,0,2,-1,-2,0,0],
    '2.7': [1,0,0,1,1,1,0,0,0,0,4,0,0,-1,-1],
    '3.0': [4,0,0,0,4,0,7,5,2,2,7,0,4,4,0],
    '3.3': [2,3,-2,4,2,6,0,6,7,2,2,3,2,3,2],
    '3.6': [9,10,9,1,2,8,2,9,0,2,2,1,7,8,9],
    '3.9': [1,3,3,3,null,null,null,null,null,null,null,null,null,null,null],
    '4.2': [2,'X',2,2,4,4,2,4,4,3,4,2,6,3,3],
    '4.5': [3,5,7,'X',6,4,4,4,1,7,2,5,4,3,3],
    '4.8': [4,4,5,5,5,4,11,'X',4,3,4,4,4,6,7],
    '5.1': [5,5,4,2,6,7,'X','X',-29,'X',3,0,5,'X',5],
    '5.4': [7,8,7,9,8,7,8,8,9,7,8,6,7,7,8],
    '5.7': [12,12,13,'X','X',11,15,'X',-12,-1,13,13,'X',14,14],
    '6.0': [13,14,15,10,14,14,15,14,'X',12,17,15,12,16,16]
  }
};
