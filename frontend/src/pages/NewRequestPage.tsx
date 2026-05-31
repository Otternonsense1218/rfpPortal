import React, { useState } from 'react';

const accountCodeOptions = [
    { value: '1181', label: '1181. Prepaid Insurance' },
]

const eocOptions = [
    { value: '2100', label: '2100. Medical Supplies' },
]

const inputStyle = {
    width: '100%',
    padding: '8px',
    background: 'var(--bg-lightblue)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)'
};

export default function NewRequestPage() {

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('NORMAL');
    const [isAsap, setIsAsap] = useState(false);
    const [budgetItem, setBudgetItem] = useState(false);
    const [dateNeeded, setDateNeeded] = useState('');
    const [lineItems, setLineItems] = useState([{ description: '', quantity: 1, unitPrice: 0, accountCode: '', eocNumber: '', itemUrl: '', notes: '', sku: '' }]);
    const [isCheckRequest, setIsCheckRequest] = useState(false);
    const [isCapitalJustification, setIsCapitalJustification] = useState(false);
    const [budgetYear, setBudgetYear] = useState('');
    const [checkPayableTo, setCheckPayableTo] = useState('');
    const [paymentAddress, setPaymentAddress] = useState('');
    const [paymentCity, setPaymentCity] = useState('');
    const [paymentStateZip, setPaymentStateZip] = useState('');
    const [repContactName, setRepContactName] = useState('');
    const [repContactEmail, setRepContactEmail] = useState('');
    const [repContactPhone, setRepContactPhone] = useState('');
    const [capitalJustificationFile, setCapitalJustificationFile] = useState<File | null>(null);



    function addLineItem() {
        setLineItems([...lineItems, { description: '', quantity: 1, unitPrice: 0, accountCode: '', eocNumber: '', itemUrl: '', notes: '', sku: '' }]);
    }

    function updateLineItem(index: number, field: string, value: any) {
        const updated = lineItems.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setLineItems(updated);
    }

    return (
        <div style={{ padding: '18px', maxWidth: '75%', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 600 }}>New Purchase Request</h2>

            {/* Title */}
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Title</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Brief description of what you need'
                    style={{ width: '50%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                />
            </div>

            {/* Priority & Date Needed */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridAutoColumns: '1fr', gap: '16px', width: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Priority</label>
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                    >
                        <option value="LOW">LOW</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="HIGH">HIGH</option>
                        <option value="URGENT">URGENT</option>
                    </select>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Date Needed</label>
                    <input
                        type="date"
                        value={dateNeeded}
                        onChange={e => setDateNeeded(e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                    />
                </div>
            </div>

            {/* Budget Item // ASAP */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'grid', gap: '16px', width: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{ fontWeight: 600 }}>Budget Item?</label>
                        <input
                            type="checkbox"
                            checked={budgetItem}
                            onChange={e => setBudgetItem(e.target.checked)}
                        />
                        <label style={{ fontWeight: 600 }}>Budget Year</label>
                        <input
                            type='text'
                            value={budgetYear}
                            onChange={e => setBudgetYear(e.target.value)}
                            style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{ fontWeight: 600 }}>Need ASAP</label>
                        <input
                            type="checkbox"
                            checked={isAsap}
                            onChange={e => setIsAsap(e.target.checked)}
                        />
                    </div>
                </div>
            </div>

            {/* Capital Justification */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'block', padding: '4px' }}>
                    <label style={{ fontWeight: 600 }}>Capital Justification <span style={{ fontWeight: 400, fontSize: 'var(--font-size-sm)' }}>
                        Capital Justification worksheet attachment required for any items exceeding $5,000
                    </span>
                    </label>
                    <input
                        type='checkbox'
                        checked={isCapitalJustification}
                        onChange={e => setIsCapitalJustification(e.target.checked)}
                    />
                    {isCapitalJustification && (
                        <input
                            type='file'
                            accept='.pdf,.doc,.docx'
                            onChange={e => setCapitalJustificationFile(e.target.files ? e.target.files[0] : null)}
                        />
                    )}
                </div>
            </div>

            {/* Check Requested */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'block', padding: '4px' }}>
                    <label style={{ fontWeight: 600, padding: '0 4px 0 0 ' }}>Check Requested</label>
                    <input
                        type='checkbox'
                        checked={isCheckRequest}
                        onChange={e => setIsCheckRequest(e.target.checked)}
                    />
                    {isCheckRequest && (
                        <div style={{ marginTop: '12px', display: 'grid', gap: '16px', width: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <label style={{ fontWeight: 600 }}>Payable To</label>
                            <input
                                type='text'
                                value={checkPayableTo}
                                onChange={e => setCheckPayableTo(e.target.value)}
                                style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                                placeholder='John Smith Company'
                            />
                            <label style={{ fontWeight: 600 }}>Payment Address</label>
                            <input
                                type='text'
                                value={paymentAddress}
                                onChange={e => setPaymentAddress(e.target.value)}
                                style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                                placeholder='1500 S Main St'
                            />
                            <label style={{ fontWeight: 600 }}>Payment City</label>
                            <input
                                type='text'
                                value={paymentCity}
                                onChange={e => setPaymentCity(e.target.value)}
                                style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                                placeholder='Eaton Rapids'
                            />
                            <label style={{ fontWeight: 600 }}>Payment State and Zip</label>
                            <input
                                type='text'
                                value={paymentStateZip}
                                onChange={e => setPaymentStateZip(e.target.value)}
                                placeholder='MI 48827'
                                style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                            />
                            <label style={{ fontWeight: 600 }}>Contact Name</label>
                            <input
                                type='text'
                                value={repContactName}
                                onChange={e => setRepContactName(e.target.value)}
                                placeholder='John Smith'
                                style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                            />
                            <label style={{ fontWeight: 600 }}>Contact Email</label>
                            <input
                                type='email'
                                value={repContactEmail}
                                onChange={e => setRepContactEmail(e.target.value)}
                                placeholder='jsmith@email.com'
                                style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                            />
                            <label style={{ fontWeight: 600 }}>Contact Phone</label>
                            <input
                                type='tel'
                                value={repContactPhone}
                                onChange={e => setRepContactPhone(e.target.value)}
                                placeholder='517-663-9555'
                                style={{ width: '100%', padding: '8px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Line Items */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontWeight: 600 }}>Line Items</label>
                    <button onClick={addLineItem} style={{ padding: '6px 12px', background: 'var(--bg-lightblue)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        + Add Item
                    </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '0.75fr 0.75fr 0.75fr 2fr 0.5fr 0.5fr 0.5fr 2fr 1fr', gap: '8px', alignItems: 'center', fontWeight: 500, fontStyle: 'italic' }}>
                    <span>Product No.</span>
                    <span>Dept #</span>
                    <span>EOC #</span>
                    <span>Full Item Description</span>
                    <span>Qty</span>
                    <span>Cost Each</span>
                    <span>Subtotal</span>
                    <span>Notes</span>
                    <span>Link</span>
                </div>
                {lineItems.map((item, index) => (
                    <div key={index} style={{ display: 'grid', gridTemplateColumns: '0.75fr 0.75fr 0.75fr 2fr 0.5fr 0.5fr 0.5fr 2fr 1fr', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <input
                            type='text'
                            value={item.sku}
                            onChange={e => updateLineItem(index, 'sku', e.target.value)}
                            style={inputStyle}
                        />
                        <select
                            value={item.accountCode}
                            onChange={e => updateLineItem(index, 'accountCode', e.target.value)}
                            style={inputStyle}
                        >
                            <option value=''>-- Select -- </option>
                            {accountCodeOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <select
                            value={item.eocNumber}
                            onChange={e => updateLineItem(index, 'eocNumber', e.target.value)}
                            style={inputStyle}
                        >
                            <option value=''>-- Select -- </option>
                            {eocOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <input
                            type='text'
                            value={item.description}
                            onChange={e => updateLineItem(index, 'description', e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type='number'
                            value={item.quantity}
                            onChange={e => updateLineItem(index, 'quantity', parseInt(e.target.value) || 0)}
                            style={inputStyle}
                        />
                        <input
                            type='number'
                            value={item.unitPrice}
                            onChange={e => updateLineItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                            style={inputStyle}
                        />
                        <div>{(item.quantity * item.unitPrice).toFixed(2)}</div>
                        <input
                            type='text'
                            value={item.notes}
                            onChange={e => updateLineItem(index, 'notes', e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type='text'
                            value={item.itemUrl}
                            onChange={e => updateLineItem(index, 'itemUrl', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                ))}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '0.75fr 0.75fr 0.75fr 2fr 0.5fr 0.5fr 0.5fr 2fr 1fr',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '8px',
                    padding: '8px',
                    background: 'var(--bg-darkblue)',
                    borderRadius: 'var(--radius-sm)',
                }}>
                    {/* blank spans to slight totals */}
                    <span /><span /><span />

                    <span style={{ display: 'flex', justifyContent: 'right', fontSize: '0.75', fontStyle: 'italic', color: '#fff' }}>Total Items: </span>
                    <strong style={{ color: '#fff' }}>{lineItems.reduce((sum, i) => sum + i.quantity, 0)}</strong>

                    <span style={{ display: 'flex', justifyContent: 'right', fontSize: '0.75', fontStyle: 'italic', color: '#fff' }}>Total: </span>
                    <strong style={{ color: '#fff'}}>${lineItems.reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0).toFixed(2)}</strong>
                </div>
            </div>
        </div>
    )


}