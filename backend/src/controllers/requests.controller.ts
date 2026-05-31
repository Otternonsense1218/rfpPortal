import { Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../types/index';

export async function createRequest(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { title,
            priority,
            status,
            dateNeeded,
            isAsap, 
            budgetItem, 
            lineItems, 
            isCheckRequest, 
            isCapitalJustification, 
            budgetYear, 
            checkPayableTo, 
            paymentAddress, 
            paymentCity, 
            paymentStateZip, 
            repContactName, 
            repContactEmail, 
            repContactPhone,
            requestedFor,
            approvingManagerId,

        } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const count = await prisma.rfpRequest.count();
        const requestNumber = `RFP-${String(count + 1).padStart(4, '0')}`;

        const totalAmount = (lineItems ?? []).reduce((sum: number, item: any) => {
            return sum + (item.quantity * item.unitPrice);
        }, 0);

        const request = await prisma.rfpRequest.create({
            data: {
                requestNumber,
                title,
                priority: priority ?? 'NORMAL',
                dateNeeded: dateNeeded ? new Date(dateNeeded) : null,
                budgetItem: budgetItem ?? false,
                isAsap: isAsap ?? false,
                isCheckRequest: isCheckRequest ?? false,
                isCapitalJustification: isCapitalJustification ?? false,
                budgetYear: budgetYear ?? null,
                checkPayableTo: checkPayableTo ?? null,
                paymentAddress: paymentAddress ?? null,
                paymentCity: paymentCity ?? null,
                paymentStateZip: paymentStateZip ?? null,
                repContactName: repContactName ?? null,
                repContactEmail: repContactEmail ?? null,
                repContactPhone: repContactPhone ?? null,
                totalAmount,
                status: status ?? 'DRAFT',
                submittedById: req.user!.userId,
                requestedFor: requestedFor ?? null,
                approvingManagerId: approvingManagerId ?? null,
                lineItems: {
                    create: (lineItems ?? []).map((item: any) => ({
                        description: item.description,
                        quantity: Number(item.quantity),
                        unitPrice: Number(item.unitPrice),
                        totalPrice: Number(item.quantity) * Number(item.unitPrice),
                        sku: item.sku ?? null,
                        eocNumber: item.eocNumber,
                        itemUrl: item.itemUrl ?? null,
                        notes: item.notes ?? null,
                        accountCode: item.accountCode ?? null,
                    })),
                },
            },
            include: { lineItems: true },
        });
        res.status(201).json(request);
    }catch (err) {
        next(err);
    }
}