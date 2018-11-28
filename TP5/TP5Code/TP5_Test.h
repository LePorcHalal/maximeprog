///////////////////////////////////////////////////////////
//  TP5_Test.h
//  Implementation of the Class TP5_Test
//  Created on:      29-oct.-2018 09:22:46
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_123781D1_39B6_4d76_9F2B_B04DFBF2D76A__INCLUDED_)
#define EA_123781D1_39B6_4d76_9F2B_B04DFBF2D76A__INCLUDED_

#include "Object3DComposite.h"
#include "TransformedObject3D.h"
#include "Invoker.h"
#include "VisitorPrimitiveSelector.h"

class TP5_Test
{
public:
	enum class RESULTAT { SUCCES, ECHEC };
	TP5_Test();
	virtual ~TP5_Test();

	RESULTAT testComposite();
	RESULTAT testDecorator();
	RESULTAT testVisitor();
	RESULTAT testCommand();
	RESULTAT interactivTestCommand();

private:
	Object3DComposite m_icone3D;
	TransformedObject3D m_cylTransformed;
	Obj3DIteratorContainer m_selectObjContainer;
	Invoker m_invoker;
};
#endif // !defined(EA_123781D1_39B6_4d76_9F2B_B04DFBF2D76A__INCLUDED_)
