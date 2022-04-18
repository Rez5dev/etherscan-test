import "./ContractDetail.scss";

export interface IContractDetail {
  read?: boolean;
  title?: string;
  description?: string;
  onWrite?: (title: string | undefined) => void;
  value?: any;
  placeholder?: string;
  onChange?: (e: any) => void;
  isERC20Token?: boolean;
  placeholder2?: string;
  description2?: string;
  value2?: any;
  onChange2?: (e: any) => void;
  placeholder3?: string;
  description3?: string;
  value3?: any;
  onChange3?: (e: any) => void;
}

const ContractDetail = ({
  read = false,
  title,
  description,
  onWrite,
  value,
  placeholder,
  onChange,
  isERC20Token,
  placeholder2,
  description2,
  value2,
  onChange2,
  placeholder3,
  description3,
  value3,
  onChange3,
}: IContractDetail) => {
  return (
    <div className="contract-detail">
      <div className="title">{title}</div>
      <div className="description-content">
        <div className="description">{description}</div>
        {description && (
          <input
            data-testid="input"
            type={description.includes("address") ? "text" : "number"}
            className="input-text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              if (onChange) {
                onChange(e.currentTarget.value);
              }
            }}
          />
        )}

        {isERC20Token && (
          <div>
            <div className="description">{description2}</div>
            {description2 && (
              <input
                data-testid="input"
                type={description2.includes("address") ? "text" : "number"}
                className="input-text"
                placeholder={placeholder2}
                value={value2}
                onChange={(e) => {
                  if (onChange2) {
                    onChange2(e.currentTarget.value);
                  }
                }}
              />
            )}
            <div className="description">{description3}</div>
            {description3 && (
              <input
                data-testid="input"
                type={description3.includes("address") ? "text" : "number"}
                className="input-text"
                placeholder={placeholder3}
                value={value3}
                onChange={(e) => {
                  if (onChange3) {
                    onChange3(e.currentTarget.value);
                  }
                }}
              />
            )}
          </div>
        )}

        <div
          className="write-btn center"
          onClick={() => {
            if (onWrite) {
              onWrite(title);
            }
          }}
        >
          {read ? value : 'write'}
        </div>
        {}
      </div>
    </div>
  );
};

export default ContractDetail;
