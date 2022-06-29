function Typography () {
  return (
    <div className="block">
      <h2 className="text-h2">Typography</h2>
      <div className="block-content">
        <div className="row-list">
          <div className="typography-item">
            <h1 className="text-h1 font-light">Heading 1</h1>
            <h2 className="text-h2 font-light">Heading 2</h2>
            <h3 className="text-h3 font-light">Heading 3</h3>
            <p className="text-xl font-light">Paragraph Extra Large</p>
            <p className="text-lg font-light">Paragraph Large</p>
            <p className="text-md font-light">Paragraph Medium</p>
            <p className="text-sm font-light">Paragraph Small</p>
            <p className="text-xs font-light">Paragraph Extra Small</p>
          </div>

          <div className="typography-item">
            <h1 className="text-h1">Heading 1</h1>
            <h2 className="text-h2">Heading 2</h2>
            <h3 className="text-h3">Heading 3</h3>
            <p className="text-xl">Paragraph Extra Large</p>
            <p className="text-lg">Paragraph Large</p>
            <p className="text-md">Paragraph Medium</p>
            <p className="text-sm">Paragraph Small</p>
            <p className="text-xs">Paragraph Extra Small</p>
          </div>

          <div className="typography-item">
            <h1 className="text-h1 font-bold">Heading 1</h1>
            <h2 className="text-h2 font-bold">Heading 2</h2>
            <h3 className="text-h3 font-bold">Heading 3</h3>
            <p className="text-xl font-bold">Paragraph Extra Large</p>
            <p className="text-lg font-bold">Paragraph Large</p>
            <p className="text-md font-bold">Paragraph Medium</p>
            <p className="text-sm font-bold">Paragraph Small</p>
            <p className="text-xs font-bold">Paragraph Extra Small</p>
          </div>
        </div>

        <div className="typography-example">
          <h1 className="text-h1">Some title</h1>
          <p className="text-md font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec euismod, nisl eget consectetur sagittis, nisl nunc.
            Ut euismod, nisl eget consectetur sagittis, nisl nunc.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Kedipi euismod, nisl eget consectetur
            sagittis, nisl nunc.
          </p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec euismod, nisl eget consectetur sagittis, nisl nunc.
            Ut euismod, nisl eget consectetur sagittis, nisl nunc.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Kedipi euismod, nisl eget consectetur
            sagittis, nisl nunc.
          </p>
          <p className="text-md font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec euismod, nisl eget consectetur sagittis, nisl nunc.
            Ut euismod, nisl eget consectetur sagittis, nisl nunc.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Kedipi euismod, nisl eget consectetur
            sagittis, nisl nunc.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Typography;
