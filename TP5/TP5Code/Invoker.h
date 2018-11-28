///////////////////////////////////////////////////////////
//  Invoker.h
//  Implementation of the Class Invoker
//  Created on:      08-nov.-2018 21:05:18
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_58D999ED_BB97_4cec_AA75_A5ADB8F6662F__INCLUDED_)
#define EA_58D999ED_BB97_4cec_AA75_A5ADB8F6662F__INCLUDED_

#include "CommandAbs.h"

class Invoker
{

public:
	Invoker();
	virtual ~Invoker();

	void execute(CmdPtr& cmd);
	void undo();
	void redo();

private:
	CmdContainer m_cmdDone;
	CmdContainer m_cmdUndone;
};
#endif // !defined(EA_58D999ED_BB97_4cec_AA75_A5ADB8F6662F__INCLUDED_)
